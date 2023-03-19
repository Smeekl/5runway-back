import { Test, TestingModule } from '@nestjs/testing';
import { CreateArticleRequestDto } from './dto';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

export const articleArray = [
  {
    id: 1,
    title: 'title',
    description: 'description',
    author: 'author',
    imageUrl: 'url',
    readTime: 1,
    createdAt: 'time',
    deletedAt: 'time',
    updatedAt: 'time',
  },
  {
    id: 2,
    title: 'title1',
    description: 'description1',
    author: 'author1',
    imageUrl: 'url',
    readTime: 4,
    createdAt: 'time1',
    deletedAt: 'time1',
    updatedAt: 'time1',
  },
];
export const extendedArticle = {
  id: 1,
  title: 'title',
  description: 'description',
  author: 'author',
  imageUrl: 'url',
  readTime: 1,
  createdAt: 'time',
  deletedAt: 'time',
  updatedAt: 'time',
  articleParts: [
    { title: 'title', text: 'text' },
    { title: 'title', text: 'text' },
  ],
};

describe('ArticleController', () => {
  let articleController: ArticleController;
  let articleMockService: ArticleService;

  beforeAll(async () => {
    const ArticleServiceProvider = {
      provide: ArticleService,
      useFactory: () => ({
        addArticle: jest.fn(),
        getAllArticles: jest.fn().mockReturnValue(articleArray),
        getExtendedArticleById: jest.fn().mockReturnValue(extendedArticle),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [ArticleService, ArticleServiceProvider],
    }).compile();

    articleController = module.get<ArticleController>(ArticleController);
    articleMockService = module.get<ArticleService>(ArticleService);
  });

  it('should call addArticle method with expected params', () => {
    const article = new CreateArticleRequestDto();

    articleController.addArticle(article);

    expect(articleMockService.addArticle).toHaveBeenCalled();
    expect(articleMockService.addArticle).toHaveBeenCalledTimes(1);
    expect(articleMockService.addArticle).toBeCalledWith(article);
  });

  it('should call getAllArticles method without params', () => {
    const articles = articleController.getAllArticles();

    expect(articleMockService.getAllArticles).toHaveBeenCalled();
    expect(articleMockService.getAllArticles).toHaveBeenCalledTimes(1);
    expect(articleMockService.getAllArticles).toBeCalledWith();
    expect(articles).toBe(articleArray);
  });

  it('should call getExtendedArticleById method with expected params', () => {
    const article = articleController.getExtendedArticleById(1);

    expect(articleMockService.getExtendedArticleById).toHaveBeenCalled();
    expect(articleMockService.getExtendedArticleById).toHaveBeenCalledTimes(1);
    expect(articleMockService.getExtendedArticleById).toBeCalledWith(1);
    expect(article).toBe(extendedArticle);
  });
});
