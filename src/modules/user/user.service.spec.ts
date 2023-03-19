import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import { UserService } from '@modules/user/user.service';
import { UserRepository } from '@repositories/user.repository';
import { mockedUser } from '@mocks/userMocks';
import { USER_ERRORS } from '@constants/errors';
import { TUser } from './types';

jest.mock('bcrypt', () => ({
  compare: jest.fn((password) => password === mockedUser.password),
  hash: jest.fn().mockReturnValue('mock-hash'),
}));

describe('User service Unit Tests', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: 'test.env',
        }),
      ],
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: createMock<UserRepository>(),
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);

    jest.spyOn(userRepository, 'getUserBy').mockResolvedValue(mockedUser);
  });

  describe('1. Tests for createUser method', () => {
    let user: TUser;

    beforeEach(() => {
      user = {
        email: mockedUser.email,
      };
    });

    it('1.1 should call save method with expexted params and the argument should have profile property', async () => {
      await userService.createUser(user);

      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledWith(user);
      expect(user).toHaveProperty('profile');
    });

    it('1.2 should call create method if user contain the password property', async () => {
      user = {
        email: mockedUser.email,
        password: 'password',
      };

      await userService.createUser(user);

      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(userRepository.create).toHaveBeenCalledWith({
        ...user,
        password: 'mock-hash',
      });
    });
  });

  describe('2. Tests for validateUser method', () => {
    it('2.1 should call getUserBy method with expected params', async () => {
      await userService.validateUser(mockedUser.email, mockedUser.password);

      expect(userRepository.getUserBy).toHaveBeenCalledTimes(1);
      expect(userRepository.getUserBy).toHaveBeenCalledWith(
        {
          key: 'email',
          value: mockedUser.email,
        },
        {
          withPassword: true,
        },
      );
    });

    it('2.2 should throw an error if the user does not exist', async () => {
      jest.spyOn(userRepository, 'getUserBy').mockResolvedValue(null);

      try {
        await userService.validateUser(mockedUser.email, mockedUser.password);
      } catch (error) {
        expect(error).toEqual(new NotFoundException());
      }
    });

    it('2.3 should throw an error if the password is wrong', async () => {
      try {
        await userService.validateUser(mockedUser.email, 'wrong-password');
      } catch (error) {
        expect(error).toEqual(
          new UnauthorizedException({
            message: USER_ERRORS.INCORRECT_PASSWORD,
          }),
        );
      }
    });
  });
});
