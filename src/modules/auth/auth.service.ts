import { firstValueFrom } from 'rxjs';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@modules/user/user.service';
import { UserRepository } from '@repositories/user.repository';
import {
  CreateUserRequestDto,
  CreateUserRequestLocalDto,
} from '@modules/user/dto';
import { USER_ERRORS } from '@constants/errors';
import { TPayload, TTokens, TJwtPayload, TFacebookAuthResponse } from './types';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
    private httpService: HttpService,
    private userRepository: UserRepository,
  ) {}

  generateTokens(userId: number, email: string): TTokens {
    const jwtPayload: TJwtPayload = {
      userId,
      email,
    };
    const accessToken = this.jwtService.sign(jwtPayload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('ACCESS_EXPIRE'),
    });
    const refreshToken = this.jwtService.sign(jwtPayload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('REFRESH_EXPIRE'),
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  refreshTokens(token: string) {
    let payload = {} as TPayload;

    try {
      payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch {
      throw new UnauthorizedException();
    }

    return this.generateTokens(payload.userId, payload.email);
  }

  async registerUser(newUser: CreateUserRequestLocalDto) {
    const user = await this.userRepository.getUserBy({
      key: 'email',
      value: newUser.email,
    });

    if (user) {
      throw new BadRequestException({
        message: USER_ERRORS.ALREADY_REGISTERED,
      });
    }

    await this.userService.createUser(newUser);
  }

  async userAuth(email: string) {
    let user = await this.userRepository.getUserBy({
      key: 'email',
      value: email,
    });

    if (!user) {
      user = await this.userService.createUser({ email });
    }

    return this.generateTokens(user.id, user.email);
  }

  async googleAuth(token: string) {
    const {
      data: { email },
    } = await firstValueFrom(
      this.httpService.get<CreateUserRequestDto>(
        `${this.configService.get<string>('GOOGLE_API')}${token}`,
      ),
    );

    return await this.userAuth(email);
  }

  async facebookAuth(token: string, additionalEmail: string) {
    const { data } = await firstValueFrom(
      this.httpService.get<CreateUserRequestDto>(
        `${this.configService.get<string>('FACEBOOK_API')}${token}`,
      ),
    );
    const { email } = { email: additionalEmail, ...data };
    const response: TFacebookAuthResponse = {
      hasEmail: Boolean(email),
    };

    if (email) {
      response.tokens = await this.userAuth(email);
    }

    return response;
  }
}
