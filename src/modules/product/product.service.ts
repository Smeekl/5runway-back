import { Injectable, NotFoundException } from '@nestjs/common';
import { COMMON_ERRORS } from '@constants/errors';
import { ProductRepository } from '@repositories/product.repository';
import { CreateProductRequestDto, GetProductQueryDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  addProduct(product: CreateProductRequestDto) {
    return this.productRepository.add(product);
  }

  getAll(params: GetProductQueryDto) {
    return this.productRepository.getAll(params);
  }

  getProductsById(ids: number[]) {
    return this.productRepository.getById(ids);
  }

  async getExtendedProduct(id: number) {
    const product = await this.productRepository.getExtendedById(id);

    if (!product) {
      throw new NotFoundException(COMMON_ERRORS.NOT_FOUND);
    }

    return product;
  }
}
