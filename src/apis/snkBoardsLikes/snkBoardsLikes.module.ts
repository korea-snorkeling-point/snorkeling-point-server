import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnkBoardsLikesResolver } from './snkBoardsLikes.resolver';
import { SnkBoardsLikesService } from './snkBoardsLikes.service';
import { SnkBoardLike } from './entities/snkBoardLike.entity';
import { SnkBoard } from '../snkBoards/entities/snkBoard.entity';
import { SnkBoardsService } from '../snkBoards/snkBoards.service';
import { AddrOne } from '../addrOnes/entities/addrOne.entity';
import { AddrTwo } from '../addrTwos/entities/addrTwo.entity';
import { SnkBoardImage } from '../snkBoardsImages/entities/snkBoardImage.entity';
import { SnkBoardTag } from '../snkBoardsTags/entities/snkBoardTag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SnkBoardLike, //
      SnkBoard,
      AddrOne,
      AddrTwo,
      SnkBoardImage,
      SnkBoardTag,
    ]),
  ],
  providers: [
    SnkBoardsLikesResolver, //
    SnkBoardsLikesService,
    SnkBoardsService,
  ],
})
export class SnkBoardsLikesModule {}
