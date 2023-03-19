import * as bcrypt from 'bcrypt';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@entities/user/user.entity';
import { Profile } from '@entities/profile/profile.entity';
import { UserRepository } from '@repositories/user.repository';
import { USER_ERRORS } from '@constants/errors';
import { TUser } from './types';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private configService: ConfigService,
  ) {}

  async createUser(newUser: TUser): Promise<User> {
    const profile = new Profile();

    profile.subscriptionPlan = '0';
    profile.expiringDate = '0';
    newUser.profile = profile;

    if ('password' in newUser && newUser.password) {
      const hash = await bcrypt.hash(
        newUser.password,
        Number(this.configService.get('SALT')),
      );

      newUser = this.userRepository.create({
        ...newUser,
        password: hash,
      });
    }

    return await this.userRepository.save(newUser);
  }

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.userRepository.getUserBy(
      {
        key: 'email',
        value: email,
      },
      { withPassword: true },
    );

    if (!user) {
      throw new NotFoundException();
    }

    const isPasswordEquals = await bcrypt.compare(password, user.password);

    if (!isPasswordEquals) {
      throw new UnauthorizedException({
        message: USER_ERRORS.INCORRECT_PASSWORD,
      });
    }

    return true;
  }
}
