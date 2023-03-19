import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateArticlePartRequestDto } from './create-article-part-request.dto';

export class CreateArticleRequestDto {
  @ApiProperty({ type: 'string', example: '5 books by Bill Gates' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: 'string',
    example: '5 books which need to be readed by you',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: 'string', example: 'Danil Stolbov' })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({ type: 'string', example: 'aws/article-image' })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({ type: 'number', example: 7 })
  @IsNumber()
  @IsNotEmpty()
  readTime: number;

  @ApiProperty({
    type: 'array',
    example: [
      {
        title: 'First book',
        text: 'this book about...',
      },
      {
        title: 'Second book',
        text: 'this book about...',
      },
    ],
  })
  @IsArray()
  @IsNotEmpty()
  articleParts: CreateArticlePartRequestDto[];
}
