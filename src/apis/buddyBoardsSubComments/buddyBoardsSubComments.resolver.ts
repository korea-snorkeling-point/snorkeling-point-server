import { Resolver } from '@nestjs/graphql';
import { BuddyBoardsSubCommentsService } from './buddyBoardsSubComments.service';

@Resolver()
export class BuddyBoardsSubCommentsResolver {
  constructor(
    private readonly buddyBoardSubCommentService: BuddyBoardsSubCommentsService, //
  ) {}
}
