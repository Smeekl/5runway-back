import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Product } from '@entities/product/product.entity';
import {
  CreateProductRequestDto,
  GetProductQueryDto,
} from '@modules/product/dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async add(product: CreateProductRequestDto) {
    const createdProduct = this.create(product);

    await this.save(createdProduct);
  }

  getAll({
    category,
    model,
    location,
    minPrice = '0',
    minMileage = '0',
    maxPrice,
    maxMileage,
  }: GetProductQueryDto) {
    const query = this.createQueryBuilder('product');

    if (category) {
      query.andWhere('product.category = :category', { category });
    }

    if (model) {
      query.andWhere('product.name = :model', { model });
    }

    if (Number(maxPrice) > 0) {
      query.andWhere(`product.price BETWEEN ${minPrice} AND ${maxPrice}`);
    }

    if (Number(maxMileage) > 0) {
      query.andWhere(`product.mileage BETWEEN ${minMileage} AND ${maxMileage}`);
    }

    if (location) {
      query.andWhere('product.location = :location', { location });
    }

    return query.getMany();
  }

  getById(ids: number[]) {
    return this.createQueryBuilder('product')
      .where('product.id IN (:...ids)', { ids })
      .getMany();
  }

  getExtendedById(id: number) {
    return this.createQueryBuilder('product')
      .where('product.id = :id', { id })
      .leftJoinAndSelect('product.productInfo', 'p')
      .leftJoin('product.images', 'pi')
      .leftJoin('product.documents', 'pd')
      .addSelect(['pi.imageUrl', 'pi.alt', 'pd.documentUrl', 'pd.name'])
      .getOne();
  }
}
