import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@repositories/user.repository';
import { TypeOrmExModule } from '@repositories/custom';
import { User } from '@entities/user/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ProfileService } from './profile.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmExModule.forCustomRepository([UserRepository]),
  ],
  providers: [UserService, ProfileService],
  controllers: [UserController],
  exports: [UserService, ProfileService],
})
export class UserModule {}
