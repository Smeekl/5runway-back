import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from './article.entity';

@Entity('articleParts')
export class ArticleParts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  text: string;

  @ManyToOne(() => Article, (article) => article.id)
  article: number;
}
