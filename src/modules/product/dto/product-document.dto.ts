import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProductDocumentDto {
  @ApiProperty({ type: 'string', example: 'characteristics' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: 'string', example: 'aws/document' })
  @IsString()
  @IsNotEmpty()
  documentUrl: string;
}
