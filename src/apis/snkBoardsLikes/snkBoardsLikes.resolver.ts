import { Resolver } from '@nestjs/graphql';
import { SnkBoardsLikesService } from './snkBoardsLikes.service';

@Resolver()
export class SnkBoardsLikesResolver {
  constructor(
    private readonly snkBoardsLikesService: SnkBoardsLikesService, //
  ) {}
}
