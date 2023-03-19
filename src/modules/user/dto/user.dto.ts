import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserRequestDto } from './create-user-request.dto';

export class UserDto extends CreateUserRequestDto {
  @ApiProperty({ type: 'number', example: 10 })
  id: number;

  @ApiProperty({ type: 'string', example: '1111Egor' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  password?: string;
}
