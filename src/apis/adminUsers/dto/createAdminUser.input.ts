import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAdminUserInput {
  @Field(() => String)
  account: string;

  @Field(() => String)
  password: string;
}
