import { Injectable, NotFoundException } from '@nestjs/common';
import { COMMON_ERRORS } from '@constants/errors';
import { ArticleRepository } from '@repositories/article.repository';
import { CreateArticleRequestDto } from './dto';

@Injectable()
export class ArticleService {
  constructor(private articleRepository: ArticleRepository) {}

  addArticle(article: CreateArticleRequestDto) {
    return this.articleRepository.add(article);
  }

  getAllArticles() {
    return this.articleRepository.getAll();
  }

  async getExtendedArticleById(id: number) {
    const article = this.articleRepository.getExtendedById(id);

    if (!article) {
      throw new NotFoundException(COMMON_ERRORS.NOT_FOUND);
    }

    return article;
  }
}
