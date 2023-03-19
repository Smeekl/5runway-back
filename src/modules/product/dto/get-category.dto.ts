import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetCategoryDto {
  @ApiProperty({ type: 'number', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ type: 'string', example: 'name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: 'string', example: 'aws/image' })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;
}
