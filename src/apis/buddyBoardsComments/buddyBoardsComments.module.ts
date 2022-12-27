import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuddyBoard } from '../buddyBoards/entities/buddyBoard.entity';
import { BuddyBoardsCommentsResolver } from './buddyBoardsComments.resolver';
import { BuddyBoardsCommentsService } from './buddyBoardsComments.service';
import { BuddyBoardComment } from './entities/buddyBoardComment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BuddyBoardComment, //
      BuddyBoard, //
    ]),
  ],
  providers: [
    BuddyBoardsCommentsResolver, //
    BuddyBoardsCommentsService,
  ],
})
export class BuddyBoardsCommentsModule {}
