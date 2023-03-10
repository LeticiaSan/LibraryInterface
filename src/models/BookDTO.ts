import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './CategoryDTO';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  registrationNumber: string;

  @Column()
  title: string;

  @ManyToOne(() => Category, category => category.books)
  category: Category;

  @Column()
  author: string;

  @Column()
  publicationDate: Date;
}