import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { User } from '@entities/user/user.entity';
import { UpdateUserProfileDto } from '@modules/user/dto';
import { COMMON_ERRORS } from '@constants/errors';
import { CustomRepository } from '@repositories/custom';
import { GetByDto, GetUserOptionsDto } from './dto';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  getUserBy({ key, value }: GetByDto, options: GetUserOptionsDto = {}) {
    const query = this.createQueryBuilder('user').where(
      `user.${key} = :${key}`,
      { [key]: value },
    );

    if (options.withPassword) {
      query.addSelect('user.password');
    }

    return query.getOne();
  }

  async getProfileByUserId(id: number) {
    const user = await this.findOne({
      where: { id },
      relations: ['profile'],
    });

    if (!user || !user.profile) {
      throw new NotFoundException(COMMON_ERRORS.NOT_FOUND);
    }

    return user.profile;
  }

  async updateProfileByUserId(
    userId: number,
    updatedProfile: UpdateUserProfileDto,
  ) {
    const { id } = await this.getProfileByUserId(userId);

    this.save({
      id: userId,
      profile: { id, ...updatedProfile },
    });
  }
}
