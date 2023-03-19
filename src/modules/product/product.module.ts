import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@entities/product/product.entity';
import { ProductDocument } from '@entities/product/productDocuments.entity';
import { ProductImage } from '@entities/product/productImages.entity';
import { ProductInfo } from '@entities/product/productInfo.entity';
import { Category } from '@entities/category/category.entity';
import { ProductRepository } from '@repositories/product.repository';
import { CategoryRepository } from '@repositories/category.repository';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CategoryService } from './category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductInfo,
      ProductImage,
      ProductDocument,
      Category,
    ]),
  ],
  providers: [
    ProductRepository,
    ProductService,
    CategoryRepository,
    CategoryService,
  ],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
