import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { CreateUserRequestLocalDto } from '@modules/user/dto';
import { mockedUser } from '@mocks/userMocks';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TTokens } from './types';

const token = 'token';
const mockResponse: TTokens = {
  refreshToken: 'refresh-token',
  accessToken: 'acces-token',
};
const user: CreateUserRequestLocalDto = {
  email: mockedUser.email,
  password: mockedUser.password,
};

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: createMock<AuthService>(),
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('1. should call refreshTokens method with expected params and return correct data', () => {
    jest.spyOn(authService, 'refreshTokens').mockReturnValue(mockResponse);

    const result = authController.refresh({ refreshToken: token });

    expect(authService.refreshTokens).toHaveBeenCalledTimes(1);
    expect(authService.refreshTokens).toHaveBeenCalledWith(token);
    expect(result).toBe(mockResponse);
  });

  it('2. should call registerUser method with expected params', () => {
    authController.registration(user);

    expect(authService.registerUser).toHaveBeenCalledTimes(1);
    expect(authService.registerUser).toHaveBeenCalledWith(user);
  });

  it('3. should call userAuth method with expected params and return correct data', async () => {
    jest.spyOn(authService, 'userAuth').mockResolvedValue(mockResponse);
    const result = await authController.login(user);

    expect(authService.userAuth).toHaveBeenCalledTimes(1);
    expect(authService.userAuth).toHaveBeenCalledWith(user.email);
    expect(result).toBe(mockResponse);
  });

  it('4. should call googleAuth method with expected params  and return correct data', async () => {
    jest.spyOn(authService, 'googleAuth').mockResolvedValue(mockResponse);

    const result = await authController.googleVerification(token);

    expect(authService.googleAuth).toHaveBeenCalledTimes(1);
    expect(authService.googleAuth).toHaveBeenCalledWith(token);
    expect(result).toBe(mockResponse);
  });

  it('5. should call facebookAuth method with expected params and return correct data', async () => {
    const expectedParams = {
      token,
      additionalEmail: 'email@jest.test',
    };
    const expectedResponse = {
      hasEmail: false,
      tokens: mockResponse,
    };

    jest.spyOn(authService, 'facebookAuth').mockResolvedValue(expectedResponse);

    const result = await authController.facebookVerification(expectedParams);

    expect(authService.facebookAuth).toHaveBeenCalledTimes(1);
    expect(authService.facebookAuth).toHaveBeenCalledWith(
      expectedParams.token,
      expectedParams.additionalEmail,
    );
    expect(result).toBe(expectedResponse);
  });
});
