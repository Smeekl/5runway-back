import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('productDocument')
export class ProductDocument {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  documentUrl: string;

  @ManyToOne(() => Product, (product) => product.documents)
  @JoinColumn({ name: 'productId' })
  product: Product;
}
