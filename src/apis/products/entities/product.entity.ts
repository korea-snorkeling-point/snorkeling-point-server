import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productCategories/entities/productCategory.entity';
import { ProductImage } from 'src/apis/productsImages/entities/productImage.entity';
import { ProductLike } from 'src/apis/productsLikes/entities/productLike.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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
  @JoinColumn()
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.product)
  user: User;

  // Product : ProductCategory - N : 1 관계
  @JoinColumn()
  @Field(() => ProductCategory)
  @ManyToOne(
    () => ProductCategory,
    (productCategory) => productCategory.category,
  )
  productCategory: ProductCategory;

  // Product : ProductLike - 1 : N 관계
  @OneToMany(() => ProductLike, (productLike) => productLike.product)
  @Field(() => [ProductLike])
  productLikes: ProductLike[];

  // Product : ProductImage - 1 : N 관계
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
  })
  @Field(() => [ProductImage])
  productImages: ProductImage[];

  // Product : ProductChatRoom - 1 : N 관계
}
