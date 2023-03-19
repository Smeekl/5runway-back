import { of } from 'rxjs';
import { Test, TestingModule } from '@nestjs/testing';
import {
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { createMock } from '@golevelup/ts-jest';
import { AuthService } from '@modules/auth/auth.service';
import { UserService } from '@modules/user/user.service';
import { UserRepository } from '@repositories/user.repository';
import { USER_ERRORS } from '@constants/errors';
import { mockedUser } from '@mocks/userMocks';
import { CreateUserRequestLocalDto } from '@modules/user/dto';
import { TJwtPayload, TTokens } from './types';

const token = 'token';
const tokensResponse: TTokens = {
  accessToken: token,
  refreshToken: token,
};
const mockApiResponse = {
  data: {},
  status: 200,
  statusText: '',
  headers: {},
  config: {},
};

describe('Auth Service Unit Tests', () => {
  let authService: AuthService;
  let userService: UserService;
  let userRepository: UserRepository;
  let httpService: HttpService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: 'test.env',
        }),
      ],
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: createMock<UserService>(),
        },
        {
          provide: JwtService,
          useValue: createMock<JwtService>(),
        },
        {
          provide: HttpService,
          useValue: createMock<HttpService>(),
        },
        {
          provide: UserRepository,
          useValue: createMock<UserRepository>(),
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    httpService = module.get<HttpService>(HttpService);
    userRepository = module.get<UserRepository>(UserRepository);

    jest.spyOn(userRepository, 'getUserBy').mockResolvedValue(mockedUser);
    jest
      .spyOn(httpService, 'get')
      .mockImplementation(() => of(mockApiResponse));
  });

  describe('1. Tests for generateTokens method', () => {
    it('1.1 should call sign method with expected params', () => {
      const mockJwtPayload: TJwtPayload = {
        userId: mockedUser.id,
        email: mockedUser.email,
      };
      authService.generateTokens(mockedUser.id, mockedUser.email);

      expect(jwtService.sign).toHaveBeenCalledTimes(2);
      expect(jwtService.sign).toHaveBeenNthCalledWith(1, mockJwtPayload, {
        secret: 'jwt-secret',
        expiresIn: '2d',
      });
      expect(jwtService.sign).toHaveBeenNthCalledWith(2, mockJwtPayload, {
        secret: 'jwt-secret',
        expiresIn: '1d',
      });
    });

    it('1.2 should return expected result', () => {
      jest.spyOn(jwtService, 'sign').mockReturnValue('token');

      const result = authService.generateTokens(
        mockedUser.id,
        mockedUser.email,
      );

      expect(result).toEqual(tokensResponse);
    });
  });

  describe('2. Tests for refreshTokens method', () => {
    it('2.1 should call verify method with expected params', () => {
      authService.refreshTokens(token);

      expect(jwtService.verify).toHaveBeenCalledTimes(1);
      expect(jwtService.verify).toHaveBeenCalledWith(token, {
        secret: 'jwt-secret',
      });
    });

    it('2.2 should throw error if token not verified', () => {
      jest.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw null;
      });

      try {
        authService.refreshTokens(token);
      } catch (e) {
        expect(e).toEqual(new UnauthorizedException());
      }
    });

    it('2.3 should return expected result', () => {
      jest.spyOn(jwtService, 'sign').mockReturnValue('token');

      const result = authService.generateTokens(
        mockedUser.id,
        mockedUser.email,
      );

      expect(result).toEqual(tokensResponse);
    });
  });

  describe('3. Test for registerUser method', () => {
    const newUser = new CreateUserRequestLocalDto();

    it('3.1 should throw an error if the user exist', async () => {
      try {
        await authService.registerUser(newUser);
      } catch (error) {
        expect(error).toEqual(
          new HttpException(
            USER_ERRORS.ALREADY_REGISTERED,
            HttpStatus.BAD_REQUEST,
          ),
        );
      }
    });

    it('3.2 should call createUser method with expected params', async () => {
      jest.spyOn(userRepository, 'getUserBy').mockResolvedValue(null);

      await authService.registerUser(newUser);

      expect(userService.createUser).toHaveBeenCalledTimes(1);
      expect(userService.createUser).toHaveBeenCalledWith(newUser);
    });
  });

  describe('4. Tests for userAuth method', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('4.1 should call getUserBy method with expected params', async () => {
      await authService.userAuth(mockedUser.email);

      expect(userRepository.getUserBy).toHaveBeenCalledTimes(1);
      expect(userRepository.getUserBy).toHaveBeenCalledWith({
        key: 'email',
        value: mockedUser.email,
      });
    });

    it('4.2 should call createUser with expected params if the user does not exist', async () => {
      jest.spyOn(userRepository, 'getUserBy').mockResolvedValue(null);

      await authService.userAuth(mockedUser.email);

      expect(userService.createUser).toHaveBeenCalledTimes(1);
      expect(userService.createUser).toHaveBeenCalledWith({
        email: mockedUser.email,
      });
    });

    it('4.3 should call generateTokens with expected params if user exists', async () => {
      authService.generateTokens = jest.fn();

      await authService.userAuth(mockedUser.email);

      expect(authService.generateTokens).toHaveBeenCalledTimes(1);
      expect(authService.generateTokens).toHaveBeenCalledWith(
        mockedUser.id,
        mockedUser.email,
      );
    });
  });

  describe('5. Test for googleAuth method', () => {
    it('5.1 should call get method with expected params', async () => {
      await authService.googleAuth(token);

      expect(httpService.get).toHaveBeenCalledTimes(1);
      expect(httpService.get).toHaveBeenCalledWith(
        'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + token,
      );
    });

    it('5.2 should return expected result', async () => {
      jest.spyOn(authService, 'userAuth').mockResolvedValue(tokensResponse);

      const result = await authService.googleAuth(token);

      expect(result).toEqual(tokensResponse);
    });
  });

  describe('6. Test for facebookAuth method', () => {
    beforeEach(() => {
      jest.spyOn(authService, 'userAuth').mockResolvedValue(tokensResponse);
      mockApiResponse.data = {};
    });

    const additionalEmail = 'additional@email.test';

    it('6.1 should call get method with expected params', async () => {
      await authService.facebookAuth(token, undefined);

      expect(httpService.get).toHaveBeenCalledTimes(1);
      expect(httpService.get).toHaveBeenCalledWith(
        'https://graph.facebook.com/me?fields=email&access_token=token',
      );
    });
    it('6.2 should not call loginUserwhen second argument undefined and facebook verification return data without email and return expected result', async () => {
      const result = await authService.facebookAuth(token, undefined);

      expect(authService.userAuth).toHaveBeenCalledTimes(0);
      expect(result).toEqual({ hasEmail: false });
    });

    it('6.3 should call loginUser with expected params when second argument undefined and facebook verification return data with email and return expected result', async () => {
      mockApiResponse.data = { email: mockedUser.email };

      const result = await authService.facebookAuth(token, undefined);

      expect(authService.userAuth).toHaveBeenCalledTimes(1);
      expect(authService.userAuth).toHaveBeenCalledWith(mockedUser.email);
      expect(result).toEqual({ hasEmail: true, tokens: tokensResponse });
    });

    it('6.4 should return expected result when the second argument exists and facebook verification return data with email and return expected result', async () => {
      mockApiResponse.data = { email: mockedUser.email };

      const result = await authService.facebookAuth(token, additionalEmail);

      expect(authService.userAuth).toHaveBeenCalledTimes(1);
      expect(authService.userAuth).toHaveBeenCalledWith(mockedUser.email);
      expect(result).toEqual({ hasEmail: true, tokens: tokensResponse });
    });

    it('6.5 should return expected result when the second argument exists and and facebook verification return data without email and return expected result', async () => {
      const result = await authService.facebookAuth(token, additionalEmail);

      expect(authService.userAuth).toHaveBeenCalledTimes(1);
      expect(authService.userAuth).toHaveBeenCalledWith(additionalEmail);
      expect(result).toEqual({ hasEmail: true, tokens: tokensResponse });
    });
  });
});
