import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TokenResponseDto } from './token-response.dto';

export class GetFacebookResponseDto {
  @ApiProperty({ type: 'boolean', example: 'true' })
  @IsBoolean()
  hasEmail: boolean;

  @ApiProperty({ type: TokenResponseDto })
  tokens?: TokenResponseDto;
}
