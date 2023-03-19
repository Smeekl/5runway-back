import { Entity, Column, OneToOne, OneToMany, ManyToOne } from 'typeorm';
import { Category } from '@entities/category/category.entity';
import { BaseEntity } from '../base.entity';
import { ProductDocument } from './productDocuments.entity';
import { ProductImage } from './productImages.entity';
import { ProductInfo } from './productInfo.entity';

@Entity('products')
export class Product extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'int' })
  mileage: number;

  @Column({ type: 'varchar' })
  engine: string;

  @Column({ type: 'varchar' })
  location: string;

  @Column({ type: 'varchar' })
  mainImageUrl: string;

  @OneToOne(() => ProductInfo, (productInfo) => productInfo.product, {
    cascade: true,
  })
  productInfo: ProductInfo;

  @OneToMany(() => ProductImage, (image) => image.product, {
    cascade: true,
  })
  images: ProductImage[];

  @OneToMany(() => ProductDocument, (document) => document.product, {
    cascade: true,
  })
  documents: ProductDocument[];

  @ManyToOne(() => Category, (category) => category.id)
  category: number;
}
