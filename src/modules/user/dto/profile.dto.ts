import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ProfileDto {
  @ApiProperty({ type: 'string', example: '1' })
  @IsNumber()
  id?: number;

  @ApiProperty({ type: 'string', example: 'Basic' })
  @IsString()
  subscriptionPlan: string;

  @ApiProperty({ type: 'string', example: '1659016209995' })
  @IsString()
  expiringDate: string;
}
