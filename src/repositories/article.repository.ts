import { Repository } from 'typeorm';
import { Article } from '@entities/article/article.entity';
import { CreateArticleRequestDto } from '@modules/article/dto';
import { CustomRepository } from './custom/CustomRepository.decorator';

@CustomRepository(Article)
export class ArticleRepository extends Repository<Article> {
  async add(article: CreateArticleRequestDto) {
    const createdArticle = this.create(article);

    await this.save(createdArticle);
  }

  getAll() {
    return this.createQueryBuilder('article')
      .orderBy('article.createdAt', 'DESC')
      .getMany();
  }

  getExtendedById(id: number) {
    return this.createQueryBuilder('article')
      .where('article.id = :id', { id })
      .leftJoinAndSelect('article.articleParts', 'articleParts')
      .getOne();
  }
}
