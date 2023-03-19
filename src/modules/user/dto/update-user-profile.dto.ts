import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserProfileDto {
  @ApiProperty({ type: 'string', example: 'Basic' })
  @IsOptional()
  @IsString()
  subscriptionPlan?: string;

  @ApiProperty({ type: 'string', example: '1659016209995' })
  @IsOptional()
  @IsString()
  expiringDate?: string;
}
