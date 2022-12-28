import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column({ default: 0 })
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => String)
  address: string;

  @Column({ default: false })
  @Field(() => Boolean)
  isSold: boolean;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;

  // Product : User - N : 1 관계
  // Product : ProductCategory - N : 1 관계

  // Product : ProductLike - 1 : N 관계
  // Product : ProductChatRoom - 1 : N 관계
  // Product : ProductImg - 1 : N 관계
}
