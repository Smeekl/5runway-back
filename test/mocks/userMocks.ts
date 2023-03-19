import { Profile } from '@entities/profile/profile.entity';
import { User } from '@entities/user/user.entity';
import {
  GetUserResponseDto,
  UpdateUserProfileDto,
  GetProfileResponseDto,
} from '@modules/user/dto';

export const mockProfile: Profile = {
  id: 1,
  subscriptionPlan: '2',
  expiringDate: '1123581321',
};

export const mockedUser: User = {
  id: 13,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  email: 'user@test.jest',
  profile: mockProfile,
  password: '$2b$10$I4ZE3s/NFJbHYuk9N7VYq.MiICjn9egmY8FeeR3yH6TteGaflAEE2',
};

export const mockProfileResponse: GetProfileResponseDto = {
  email: mockedUser.email,
  subscriptionPlan: mockProfile.subscriptionPlan,
  expiringDate: mockProfile.expiringDate,
};

export const mockProfileRequest: GetUserResponseDto = {
  id: mockedUser.id,
  email: mockedUser.email,
};

export const mockNewProfileParams: UpdateUserProfileDto = {
  subscriptionPlan: '1',
};
