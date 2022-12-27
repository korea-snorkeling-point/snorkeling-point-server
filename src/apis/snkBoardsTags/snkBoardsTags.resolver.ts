import { Resolver } from '@nestjs/graphql';
import { SnkBoardsTagsService } from './snkBoardsTags.service';

@Resolver()
export class SnkBoardsTagsResolver {
  constructor(
    private readonly snkBoardsTagsService: SnkBoardsTagsService, //
  ) {}
}
