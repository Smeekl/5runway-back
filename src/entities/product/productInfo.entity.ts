import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('productInfo')
export class ProductInfo {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  interior: string;

  @Column({ type: 'varchar' })
  equipment: string;

  @Column({ type: 'varchar' })
  remarks: string;

  @OneToOne(() => Product, (product) => product.productInfo)
  @JoinColumn({ name: 'productId' })
  product: Product;
}
