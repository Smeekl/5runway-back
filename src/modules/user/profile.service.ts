import { Injectable } from '@nestjs/common';
import { UserRepository } from '@repositories/user.repository';
import { UpdateUserProfileDto, GetProfileResponseDto } from './dto';

@Injectable()
export class ProfileService {
  constructor(private userRepository: UserRepository) {}

  async getProfile(
    userId: number,
    email: string,
  ): Promise<GetProfileResponseDto> {
    const { subscriptionPlan, expiringDate } =
      await this.userRepository.getProfileByUserId(userId);

    return { email, subscriptionPlan, expiringDate };
  }

  updateProfile(id: number, updatedProfile: UpdateUserProfileDto) {
    return this.userRepository.updateProfileByUserId(id, updatedProfile);
  }
}
