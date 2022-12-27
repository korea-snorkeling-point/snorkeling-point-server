import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnkBoardsBookMarksResolver } from './snkBoardsBookMarks.resolver';
import { SnkBoardsBookMarksService } from './snkBoardsBookMarks.service';
import { SnkBoardBookMark } from './entities/snkBoardBookMark.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SnkBoardBookMark, //
    ]),
  ],
  providers: [
    SnkBoardsBookMarksResolver, //
    SnkBoardsBookMarksService,
  ],
})
export class SnkBoardsBookMarksModule {}
