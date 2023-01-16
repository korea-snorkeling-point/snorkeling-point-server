import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddrOne } from '../addrOnes/entities/addrOne.entity';
import { AddrTwo } from '../addrTwos/entities/addrTwo.entity';
import { SnkBoardImage } from '../snkBoardsImages/entities/snkBoardImage.entity';
import { SnkBoardTag } from '../snkBoardsTags/entities/snkBoardTag.entity';
import { SnkBoard } from './entities/snkBoard.entity';
import { SnkBoardsResolver } from './snkBoards.resolver';
import { SnkBoardsService } from './snkBoards.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SnkBoard,
      AddrOne,
      AddrTwo,
      SnkBoardImage,
      SnkBoardTag,
    ]),
  ],
  providers: [
    SnkBoardsResolver, //
    SnkBoardsService,
  ],
})
export class SnkBoardsModule {}
