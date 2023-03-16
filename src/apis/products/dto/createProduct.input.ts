import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
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
}
