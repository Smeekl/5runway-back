import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsObject,
  IsNumber,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductInfoRequestDto } from './create-product-info-request.dto';
import { ProductImageDto } from './product-image.dto';
import { ProductDocumentDto } from './product-document.dto';

export class CreateProductRequestDto {
  @ApiProperty({ type: 'number', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  category: number;

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

  @ApiProperty({
    type: 'object',
    example: {
      description: 'some description',
      interior: 'some interior',
      equipment: 'some equipment',
      remarks: 'some remarks',
    },
  })
  @IsObject()
  @Type(() => CreateProductInfoRequestDto)
  @IsNotEmpty()
  productInfo: CreateProductInfoRequestDto;

  @ApiProperty({
    type: 'array',
    example: [
      { alt: 'image2', imageUrl: 'aws/image2' },
      { alt: 'image3', imageUrl: 'aws/image3' },
      { alt: 'image4', imageUrl: 'aws/image4' },
    ],
  })
  @IsArray()
  @IsNotEmpty()
  images: ProductImageDto[];

  @ApiProperty({
    type: 'array',
    example: [
      { name: 'document1', documentUrl: 'aws/document1' },
      { name: 'document2', documentUrl: 'aws/document2' },
      { name: 'document3', documentUrl: 'aws/document3' },
    ],
  })
  @IsArray()
  @IsNotEmpty()
  documents: ProductDocumentDto[];
}
