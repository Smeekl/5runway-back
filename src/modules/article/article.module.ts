import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Article } from '@entities/article/article.entity';
import { ArticleParts } from '@entities/article/articleParts.entity';
import { ArticleRepository } from '@repositories/article.repository';
import { TypeOrmExModule } from '@repositories/custom/TypeOrmExModule';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, ArticleParts]),
    TypeOrmExModule.forCustomRepository([ArticleRepository]),
  ],
  providers: [ArticleService],
  controllers: [ArticleController],
  exports: [ArticleService],
})
export class ArticlesModule {}
