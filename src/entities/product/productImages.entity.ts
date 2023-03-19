import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('productImage')
export class ProductImage {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar' })
  imageUrl: string;

  @Column({ type: 'varchar' })
  alt: string;

  @ManyToOne(() => Product, (product) => product.images)
  @JoinColumn({ name: 'productId' })
  product: Product;
}
