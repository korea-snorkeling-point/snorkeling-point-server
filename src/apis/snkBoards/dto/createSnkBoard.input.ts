import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSnkBoardInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  subTitle: string;

  @Field(() => String)
  description: string;

  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  lng: number;
  
  @Field(() => String)
  addrOne: string;

  @Field(() => String)
  addrTwo: string;

  @Field(() => String)
  addrDetail: string;

  @Field(() => [String])
  snkBoardImages: string[];

  @Field(() => [String])
  snkBoardTags: string[];
}