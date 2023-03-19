import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from '@modules/user/user.module';
import { TypeOrmExModule } from '@repositories/custom';
import { UserRepository } from '@repositories/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy, JWTAccessStrategy } from './strategies';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    HttpModule,
    TypeOrmExModule.forCustomRepository([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JWTAccessStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
