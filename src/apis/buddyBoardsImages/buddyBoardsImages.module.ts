import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuddyBoard } from '../buddyBoards/entities/buddyBoard.entity';
import { BuddyBoardImagesResolver } from './buddyBoardsImages.resolver';
import { BuddyBoardImagesService } from './buddyBoardsImages.service';
import { BuddyBoardImage } from './entities/buddyBoardImage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BuddyBoardImage, //
      BuddyBoard, //
    ]),
  ],
  providers: [
    BuddyBoardImagesResolver, //
    BuddyBoardImagesService,
  ],
})
export class BuddyBoardsImagesModule {}
