import { Test, TestingModule } from '@nestjs/testing';
import { Article } from '@entities/article/article.entity';
import { CreateArticleRequestDto } from '@modules/article/dto';
import {
  articleArray,
  extendedArticle,
} from '@modules/article/article.controller.spec';
import { ArticleRepository } from '../article.repository';

const mockedArticle = new Article();
const testId = 1;

describe('Articles repository', () => {
  let articleRepository: ArticleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleRepository],
    }).compile();

    articleRepository = module.get<ArticleRepository>(ArticleRepository);

    const queryBuilder = {
      leftJoinAndSelect: jest.fn(() => queryBuilder),
      where: jest.fn(() => queryBuilder),
      orderBy: jest.fn(() => queryBuilder),
      getOne: jest.fn().mockReturnValue(extendedArticle),
      getMany: jest.fn().mockReturnValue(articleArray),
    };

    articleRepository.createQueryBuilder = jest
      .fn()
      .mockReturnValue(queryBuilder);
    articleRepository.create = jest.fn().mockReturnValue(mockedArticle);
    articleRepository.save = jest.fn();
  });

  it('should call repository create method with expected params', async () => {
    const article = new CreateArticleRequestDto();

    await articleRepository.add(article);

    expect(articleRepository.create).toHaveBeenCalled();
    expect(articleRepository.create).toHaveBeenCalledTimes(1);
    expect(articleRepository.create).toBeCalledWith(article);
  });

  it('should call repository save method with expected params', async () => {
    const article = new CreateArticleRequestDto();

    await articleRepository.add(article);

    expect(articleRepository.save).toHaveBeenCalled();
    expect(articleRepository.save).toHaveBeenCalledTimes(1);
    expect(articleRepository.save).toBeCalledWith(mockedArticle);
  });

  it('should call repository orderBy method with descending order by createdAt field', async () => {
    const articles = await articleRepository.getAll();
    const builder = articleRepository.createQueryBuilder();

    expect(builder.orderBy).toBeCalled();
    expect(builder.orderBy).toHaveBeenCalledTimes(1);
    expect(builder.orderBy).toHaveBeenCalledWith('article.createdAt', 'DESC');
    expect(builder.getMany).toBeCalled();
    expect(articles).toBe(articleArray);
  });

  it('should search item by passed id', async () => {
    const article = await articleRepository.getExtendedById(testId);
    const builder = articleRepository.createQueryBuilder();

    expect(builder.where).toBeCalled();
    expect(builder.where).toHaveBeenCalledTimes(1);
    expect(builder.where).toHaveBeenCalledWith('article.id = :id', {
      id: testId,
    });
    expect(builder.getOne).toBeCalled();
    expect(article).toBe(extendedArticle);
  });
});
