import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { ArticleParts } from '@entities/article/articleParts.entity';
import { GetArticleResponseDto } from './get-article-response.dto';

export class GetExtendedArticleResponseDto extends GetArticleResponseDto {
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
  articleParts: ArticleParts[];
}
