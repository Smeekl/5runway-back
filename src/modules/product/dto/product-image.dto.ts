import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProductImageDto {
  @ApiProperty({ type: 'string', example: 'name' })
  @IsString()
  @IsNotEmpty()
  alt: string;

  @ApiProperty({ type: 'string', example: 'aws/image' })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;
}
