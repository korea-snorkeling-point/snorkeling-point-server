import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnkBoardsBookMarksResolver } from './snkBoardsBookMarks.resolver';
import { SnkBoardsBookMarksService } from './snkBoardsBookMarks.service';
import { SnkBoardBookMark } from './entities/snkBoardBookMark.entity';
import { SnkBoard } from '../snkBoards/entities/snkBoard.entity';
import { AddrOne } from '../addrOnes/entities/addrOne.entity';
import { AddrTwo } from '../addrTwos/entities/addrTwo.entity';
import { SnkBoardImage } from '../snkBoardsImages/entities/snkBoardImage.entity';
import { SnkBoardTag } from '../snkBoardsTags/entities/snkBoardTag.entity';
import { SnkBoardsService } from '../snkBoards/snkBoards.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SnkBoardBookMark, //
      SnkBoard,
      AddrOne,
      AddrTwo,
      SnkBoardImage,
      SnkBoardTag,
    ]),
  ],
  providers: [
    SnkBoardsBookMarksResolver, //
    SnkBoardsBookMarksService,
    SnkBoardsService,
  ],
})
export class SnkBoardsBookMarksModule {}
