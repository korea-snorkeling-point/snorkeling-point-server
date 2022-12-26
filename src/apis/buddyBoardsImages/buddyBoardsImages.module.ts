import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnkBoard } from '../snkBoards/entities/snkBoard.entity';
import { SnkBoardImagesResolver } from './buddyBoardsImages.resolver';
import { SnkBoardImagesService } from './buddyBoardsImages.service';
import { SnkBoardImage } from './entities/buddyBoardImage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SnkBoardImage, //
      SnkBoard, //
    ]),
  ],
  providers: [
    SnkBoardImagesResolver, //
    SnkBoardImagesService,
  ],
})
export class SnkBoardsImagesModule {}
