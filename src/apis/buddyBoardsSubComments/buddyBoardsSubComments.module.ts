import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuddyBoardsSubCommentsResolver } from './buddyBoardsSubComments.resolver';
import { BuddyBoardsSubCommentsService } from './buddyBoardsSubComments.service';
import { BuddyBoardSubComment } from './entities/buddyBoardSubComment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BuddyBoardSubComment, //
    ]),
  ],
  providers: [
    BuddyBoardsSubCommentsResolver, //
    BuddyBoardsSubCommentsService,
  ],
})
export class BuddyBoardsSubCommentsModule {}
