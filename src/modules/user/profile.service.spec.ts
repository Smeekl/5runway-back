import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { UserRepository } from '@repositories/user.repository';
import { mockedUser, mockProfileResponse } from '@mocks/userMocks';
import { ProfileService } from './profile.service';
import { UpdateUserProfileDto } from './dto';

describe('Profile service tests', () => {
  let profileService: ProfileService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: UserRepository,
          useValue: createMock<UserRepository>(),
        },
      ],
    }).compile();

    profileService = module.get<ProfileService>(ProfileService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('1. method getProfile should call getProfileByUserId method with expected params', async () => {
    jest
      .spyOn(userRepository, 'getProfileByUserId')
      .mockResolvedValue(mockedUser.profile);

    const profile = await profileService.getProfile(
      mockedUser.id,
      mockedUser.email,
    );

    expect(userRepository.getProfileByUserId).toHaveBeenCalledTimes(1);
    expect(userRepository.getProfileByUserId).toHaveBeenCalledWith(
      mockedUser.id,
    );
    expect(profile).toStrictEqual(mockProfileResponse);
  });

  it('2. method updateProfile should call updateProfileByUserId method with expected params', async () => {
    const newProfileFields = new UpdateUserProfileDto();

    newProfileFields.subscriptionPlan = '2';

    await profileService.updateProfile(mockedUser.id, newProfileFields);

    expect(userRepository.updateProfileByUserId).toHaveBeenCalledTimes(1);
    expect(userRepository.updateProfileByUserId).toBeCalledWith(
      mockedUser.id,
      newProfileFields,
    );
  });
});
