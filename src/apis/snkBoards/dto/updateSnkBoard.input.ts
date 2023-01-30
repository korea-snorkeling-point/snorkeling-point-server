import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateSnkBoardInput } from "./createSnkBoard.input";

@InputType()
export class UpdateSnkBoardInput extends PartialType(CreateSnkBoardInput) {
    @Field(() => [String])
    snkBoardImages: string[];
  
    @Field(() => [String])
    snkBoardTags: string[];
}