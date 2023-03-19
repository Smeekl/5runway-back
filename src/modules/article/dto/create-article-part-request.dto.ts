import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArticlePartRequestDto {
  @ApiProperty({ type: 'string', example: 'article part title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: 'string', example: 'article part text' })
  @IsString()
  @IsNotEmpty()
  text: string;
}
