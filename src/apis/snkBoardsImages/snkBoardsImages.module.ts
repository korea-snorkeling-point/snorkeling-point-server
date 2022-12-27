import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnkBoard } from '../snkBoards/entities/snkBoard.entity';
import { SnkBoardImagesResolver } from './snkBoardsImages.resolver';
import { SnkBoardImagesService } from './snkBoardsImages.service';
import { SnkBoardImage } from './entities/snkBoardImage.entity';

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
