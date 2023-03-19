import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import {
  mockNewProfileParams,
  mockProfileRequest,
  mockProfileResponse,
} from '@mocks/userMocks';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ProfileService } from './profile.service';

describe('Test for user controller', () => {
  let userController: UserController;
  let userService: UserService;
  let profileService: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: createMock<UserService>(),
        },
        {
          provide: ProfileService,
          useValue: createMock<ProfileService>(),
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    profileService = module.get<ProfileService>(ProfileService);
  });

  it('1. should call getProfile method with expected params and methods', async () => {
    jest
      .spyOn(profileService, 'getProfile')
      .mockResolvedValue(mockProfileResponse);

    const profile = await userController.getProfile(mockProfileRequest);

    expect(profileService.getProfile).toHaveBeenCalledTimes(1);
    expect(profileService.getProfile).toBeCalledWith(
      mockProfileRequest.id,
      mockProfileRequest.email,
    );

    expect(profile).toBe(mockProfileResponse);
  });

  it('2. should call updateProfile method with expected params and methods', () => {
    userController.updateProfile(mockProfileRequest, mockNewProfileParams);

    expect(profileService.updateProfile).toHaveBeenCalledTimes(1);
    expect(profileService.updateProfile).toBeCalledWith(
      mockProfileRequest.id,
      mockNewProfileParams,
    );
  });
});
