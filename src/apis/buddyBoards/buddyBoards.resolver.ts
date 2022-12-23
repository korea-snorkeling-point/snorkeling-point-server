import { Resolver } from '@nestjs/graphql';
import { BuddyBoardsService } from './buddyBoards.service';

@Resolver()
export class BuddyBoardsResolver {
  constructor(
    private readonly buddyBoardsService: BuddyBoardsService, //
  ) {}
}
