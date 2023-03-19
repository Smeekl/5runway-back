import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductInfoRequestDto {
  @ApiProperty({ type: 'string', example: 'some description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: 'string', example: 'some interior' })
  @IsString()
  @IsNotEmpty()
  interior: string;

  @ApiProperty({ type: 'string', example: 'some equipment' })
  @IsString()
  @IsNotEmpty()
  equipment: string;

  @ApiProperty({ type: 'string', example: 'some remarks' })
  @IsString()
  @IsNotEmpty()
  remarks: string;
}
