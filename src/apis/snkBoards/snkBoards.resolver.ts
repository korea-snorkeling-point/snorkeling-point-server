import { Resolver } from '@nestjs/graphql';
import { SnkBoardsService } from './snkBoards.service';

@Resolver()
export class SnkBoardsResolver {
  constructor(
    private readonly snkBoardsService: SnkBoardsService, //
  ) {}
}
