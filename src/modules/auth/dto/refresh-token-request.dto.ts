import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenRequestDto {
  @IsString()
  @ApiProperty({
    type: 'string',
    example:
      'dfd324234dcbcdafdadsfdsGDGSDGGedwSA34234.akmlVFBVHDF1231.CJjbhIEDR4852364',
  })
  refreshToken: string;
}
