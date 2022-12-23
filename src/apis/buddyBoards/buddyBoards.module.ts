import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuddyBoard } from './entities/buddyBoard.entity';
import { BuddyBoardsResolver } from './buddyBoards.resolver';
import { BuddyBoardsService } from './buddyBoards.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BuddyBoard, //
    ]),
  ],
  providers: [
    BuddyBoardsResolver, //
    BuddyBoardsService,
  ],
})
export class BuddyBoardsModule {}
