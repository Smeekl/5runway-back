import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  getAllCategories() {
    return this.categoryRepository.getAll();
  }
}
