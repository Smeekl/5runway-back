import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TokenResponseDto {
  @ApiProperty({
    type: 'string',
    example:
      'fdfefjndjf32423EFWEFwefjewnf43242.dfsdVCXV324fxzCKVM.jnblSZES30344672',
  })
  @IsString()
  accessToken: string;

  @ApiProperty({
    type: 'string',
    example:
      'dfd324234dcbcdafdadsfdsGDGSDGGedwSA34234.akmlVFBVHDF1231.CJjbhIEDR4852364',
  })
  @IsString()
  refreshToken: string;
}
