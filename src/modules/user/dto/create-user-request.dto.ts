import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ProfileDto } from './profile.dto';

export class CreateUserRequestDto {
  @ApiProperty({ type: 'string', example: 'egor.guzenko@gmail.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsObject()
  @Type(() => ProfileDto)
  @IsOptional()
  profile?: ProfileDto;
}
