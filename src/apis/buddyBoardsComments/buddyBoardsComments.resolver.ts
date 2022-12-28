import { Resolver } from '@nestjs/graphql';
import { BuddyBoardsCommentsService } from './buddyBoardsComments.service';

@Resolver()
export class BuddyBoardsCommentsResolver {
  constructor(
    private readonly buddyBoardsCommentsService: BuddyBoardsCommentsService, //
  ) {}
}
