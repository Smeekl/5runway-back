import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetProductQueryDto {
  @ApiPropertyOptional({
    type: 'string',
    example: 'BEECHCRAFT PREMIER',
    enum: ['boing', 'BEECHCRAFT PREMIER'],
  })
  @IsString()
  @IsOptional()
  model?: string;

  @ApiPropertyOptional({
    type: 'string',
    example: 'Kharkiv',
    enum: ['Lviv', 'Kharkiv'],
  })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({
    type: 'string',
    example: '1',
    enum: ['1', '2', '3'],
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({
    type: 'string',
    example: '100000',
    enum: ['100000', '200000', '300000'],
  })
  @IsString()
  @IsOptional()
  minPrice?: string;

  @ApiPropertyOptional({
    type: 'string',
    example: '1000000',
    enum: ['1000000', '1100000', '1200000'],
  })
  @IsString()
  @IsOptional()
  maxPrice?: string;

  @ApiPropertyOptional({
    type: 'string',
    example: '250',
    enum: ['100', '200', '300'],
  })
  @IsString()
  @IsOptional()
  minMileage?: string;

  @ApiPropertyOptional({
    type: 'string',
    example: '500',
    enum: ['1500', '4000', '4500'],
  })
  @IsString()
  @IsOptional()
  maxMileage?: string;
}
