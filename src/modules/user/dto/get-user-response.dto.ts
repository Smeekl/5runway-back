import { IsEmail, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserResponseDto {
  @ApiProperty({ type: 'number', example: 10 })
  id: number;

  @ApiProperty({ type: 'string', example: 'egor.guzenko@gmail.com' })
  @IsOptional()
  @IsEmail()
  @IsString()
  email?: string;
}
