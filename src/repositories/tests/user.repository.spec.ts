import { SelectQueryBuilder } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { UserRepository } from '@repositories/user.repository';
import { User } from '@entities/user/user.entity';
import { COMMON_ERRORS } from '@constants/errors';
import { mockedUser, mockProfile } from '@mocks/userMocks';

const mockGetUserRequest = { key: 'id', value: '1' };
const mockUpdateProfileParams = {
  subscriptionPlan: '2',
  expiringDate: '31',
};
const mockGetProfileByUserIdRequest = {
  where: {
    id: mockedUser.id,
  },
  relations: ['profile'],
};

describe('User Repository Unit Tests', () => {
  let userRepository: UserRepository;
  let queryBuilder: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);

    queryBuilder = createMock<SelectQueryBuilder<User>>();
    queryBuilder.where.mockReturnThis();

    jest
      .spyOn(userRepository, 'createQueryBuilder')
      .mockReturnValue(queryBuilder);
  });

  describe('1. getUser tests', () => {
    it('1.1 should call createQueryBuilder method with expected params', async () => {
      queryBuilder.getOne.mockReturnValue(mockedUser);

      const result = await userRepository.getUserBy(mockGetUserRequest);

      expect(userRepository.createQueryBuilder).toBeCalledTimes(1);
      expect(userRepository.createQueryBuilder).toBeCalledWith('user');
      expect(result).toBe(mockedUser);
    });

    it('1.2 should call where method with expected params', async () => {
      await userRepository.getUserBy(mockGetUserRequest);

      expect(queryBuilder.where).toBeCalledTimes(1);
      expect(queryBuilder.where).toBeCalledWith(
        `user.${mockGetUserRequest.key} = :${mockGetUserRequest.key}`,
        {
          [mockGetUserRequest.key]: mockGetUserRequest.value,
        },
      );
    });

    it('1.3 should not call addSelect method when the second argument does not exist', async () => {
      await userRepository.getUserBy(mockGetUserRequest);

      expect(queryBuilder.addSelect).toBeCalledTimes(0);
    });

    it('1.4 should call addSelect method with expected params when options exists', async () => {
      queryBuilder.getOne.mockReturnValue(mockedUser);

      const resultWithPassword = await userRepository.getUserBy(
        mockGetUserRequest,
        { withPassword: true },
      );

      expect(queryBuilder.addSelect).toBeCalledTimes(1);
      expect(queryBuilder.addSelect).toBeCalledWith('user.password');
      expect(resultWithPassword).toBe(mockedUser);
    });
  });

  describe('2. getProfileByUserId tests', () => {
    it('2.1 should call findOne method with expected params', async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockReturnValue(Promise.resolve(mockedUser));

      const result = await userRepository.getProfileByUserId(mockedUser.id);

      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(userRepository.findOne).toBeCalledWith(
        mockGetProfileByUserIdRequest,
      );
      expect(result).toStrictEqual(mockProfile);
    });

    it('2.2 should throw exeption, if user or profile is not found', async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockReturnValue(Promise.resolve(null));

      try {
        await userRepository.getProfileByUserId(mockedUser.id);
      } catch (e) {
        expect(e.response.message).toBe(COMMON_ERRORS.NOT_FOUND);
      }
    });
  });

  it('3. should call save method with expected params', async () => {
    jest
      .spyOn(userRepository, 'getProfileByUserId')
      .mockReturnValue(Promise.resolve(mockedUser.profile));
    jest
      .spyOn(userRepository, 'save')
      .mockReturnValue(Promise.resolve(mockedUser));

    await userRepository.updateProfileByUserId(
      mockedUser.id,
      mockUpdateProfileParams,
    );

    expect(userRepository.save).toHaveBeenCalledTimes(1);
    expect(userRepository.save).toBeCalledWith({
      id: mockedUser.id,
      profile: {
        id: mockProfile.id,
        ...mockUpdateProfileParams,
      },
    });
  });
});
