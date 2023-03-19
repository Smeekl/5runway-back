import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsNumber, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductInfoRequestDto } from './create-product-info-request.dto';
import { GetProductRequestDto } from './get-product-request.dto';
import { ProductImageDto } from './product-image.dto';
import { ProductDocumentDto } from './product-document.dto';

export class GetExtendedProductRequestDto extends GetProductRequestDto {
  @ApiProperty({ type: 'number', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  id: number;

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
