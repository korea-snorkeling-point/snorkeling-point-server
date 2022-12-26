import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnkBoard } from './entities/snkBoard.entity';
import { SnkBoardsResolver } from './snkBoards.resolver';
import { SnkBoardsService } from './snkBoards.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SnkBoard, //
    ]),
  ],
  providers: [
    SnkBoardsResolver, //
    SnkBoardsService,
  ],
})
export class SnkBoardsModule {}
