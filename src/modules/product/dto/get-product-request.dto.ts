import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class GetProductRequestDto {
  @ApiProperty({ type: 'number', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ type: 'string', example: 'BEECHCRAFT PREMIER' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: 'number', example: 1000000 })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ type: 'number', example: 1994 })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({ type: 'number', example: 300 })
  @IsNumber()
  @IsNotEmpty()
  mileage: number;

  @ApiProperty({ type: 'string', example: 'Turbine Helicopters' })
  @IsString()
  @IsNotEmpty()
  engine: string;

  @ApiProperty({ type: 'string', example: 'Kharkiv' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ type: 'string', example: 'aws/link-to-image' })
  @IsString()
  @IsNotEmpty()
  mainImageUrl: string;
}
