import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FetchProductOutput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => Float)
  price: number;

  @Field(() => String)
  address: string;

  @Field(() => String)
  productCategory: string;

  @Field(() => [String], { nullable: true })
  productImages: string[];

  @Field(() => Boolean, { defaultValue: false })
  isLike: boolean;
}
