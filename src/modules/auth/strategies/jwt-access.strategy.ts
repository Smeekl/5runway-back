import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserRepository } from '@repositories/user.repository';
import { TPayload } from '../types';

@Injectable()
export default class JWTAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate({ email }: TPayload) {
    const user = await this.userRepository.getUserBy({
      key: 'email',
      value: email,
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
