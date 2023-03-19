import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetArticleResponseDto {
  @ApiProperty({ type: 'number', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  id: number;

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

  @ApiProperty({ type: 'string', example: '2022-08-23 11:22:47.597497' })
  @IsString()
  @IsNotEmpty()
  createdAt: string;

  @ApiProperty({ type: 'string', example: '2022-08-23 11:22:47.597497' })
  @IsString()
  deletedAt: string | null;

  @ApiProperty({ type: 'string', example: '2022-08-23 11:22:47.597497' })
  @IsString()
  @IsNotEmpty()
  updatedAt: string;
}
