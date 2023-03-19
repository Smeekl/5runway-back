import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Category } from '@entities/category/category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  constructor(private dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  getAll() {
    return this.find();
  }
}
