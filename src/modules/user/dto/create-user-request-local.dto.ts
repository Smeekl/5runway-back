import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserRequestDto } from './index';

export class CreateUserRequestLocalDto extends CreateUserRequestDto {
  @ApiProperty({ type: 'string', example: '1111Egor' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
