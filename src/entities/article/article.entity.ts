import { Entity, Column, OneToMany } from 'typeorm';
import { TArticlePart } from '@modules/article/types';
import { BaseEntity } from '../base.entity';
import { ArticleParts } from './articleParts.entity';

@Entity('articles')
export class Article extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  author: string;

  @Column({ type: 'varchar' })
  imageUrl: string;

  @Column({ type: 'int' })
  readTime: number;

  @OneToMany(() => ArticleParts, (articlePart) => articlePart.article, {
    cascade: true,
  })
  articleParts: TArticlePart[];
}
