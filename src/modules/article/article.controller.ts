import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import {
  CreateArticleRequestDto,
  GetArticleResponseDto,
  GetExtendedArticleResponseDto,
} from './dto';

@ApiTags('article')
@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @ApiOperation({ summary: 'add new article' })
  @ApiResponse({ status: HttpStatus.CREATED })
  @Post()
  addArticle(@Body() article: CreateArticleRequestDto) {
    return this.articleService.addArticle(article);
  }

  @ApiOperation({ summary: 'get all articles' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetArticleResponseDto,
    isArray: true,
  })
  @Get()
  getAllArticles() {
    return this.articleService.getAllArticles();
  }

  @ApiOperation({ summary: 'get extended article by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetExtendedArticleResponseDto,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of article to return',
  })
  @Get('/extended/:id')
  getExtendedArticleById(@Param('id') id: number) {
    return this.articleService.getExtendedArticleById(id);
  }
}
