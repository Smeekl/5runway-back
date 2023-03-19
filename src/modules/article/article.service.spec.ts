import { Test, TestingModule } from '@nestjs/testing';
import { ArticleRepository } from '@repositories/article.repository';
import { COMMON_ERRORS } from '@constants/errors';
import { ArticleService } from './article.service';
import { CreateArticleRequestDto } from './dto';
import { articleArray, extendedArticle } from './article.controller.spec';

describe('Articles service', () => {
  let articleService: ArticleService;
  let articleRepository: ArticleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: ArticleRepository,
          useValue: {
            add: jest.fn(),
            getAll: jest.fn().mockReturnValue(articleArray),
            getExtendedById: jest.fn().mockReturnValue(extendedArticle),
          },
        },
      ],
    }).compile();

    articleService = module.get<ArticleService>(ArticleService);
    articleRepository = module.get<ArticleRepository>(ArticleRepository);
  });

  it('should be defined', () => {
    expect(articleService).toBeDefined();
  });

  it('should call repository add method with expected params', async () => {
    const article = new CreateArticleRequestDto();

    await articleService.addArticle(article);

    expect(articleRepository.add).toHaveBeenCalled();
    expect(articleRepository.add).toHaveBeenCalledWith(article);
  });

  it('should call repository getAll method without params', async () => {
    const articles = await articleService.getAllArticles();

    expect(articleRepository.getAll).toHaveBeenCalled();
    expect(articleRepository.getAll).toHaveBeenCalledTimes(1);
    expect(articleRepository.getAll).toHaveBeenCalledWith();
    expect(articles).toBe(articleArray);
  });

  it('should call repository getExtendedById method with expected params', async () => {
    const article = await articleService.getExtendedArticleById(1);

    expect(articleRepository.getExtendedById).toHaveBeenCalled();
    expect(articleRepository.getExtendedById).toHaveBeenCalledTimes(1);
    expect(articleRepository.getExtendedById).toHaveBeenCalledWith(1);
    expect(article).toBe(extendedArticle);
  });

  it('should throw error if article not found', async () => {
    articleRepository.getExtendedById = jest.fn();

    try {
      await articleService.getExtendedArticleById(1);
    } catch (e) {
      expect(e.response.message).toBe(COMMON_ERRORS.NOT_FOUND);
    }
  });
});
