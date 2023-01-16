import { InputType, PartialType } from "@nestjs/graphql";
import { CreateSnkBoardInput } from "./createSnkBoard.input";

@InputType()
export class UpdateSnkBoardInput extends PartialType(CreateSnkBoardInput) {}