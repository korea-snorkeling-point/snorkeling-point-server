import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnkBoardsLikesResolver } from './snkBoardsLikes.resolver';
import { SnkBoardsLikesService } from './snkBoardsLikes.service';
import { SnkBoardLike } from './entities/snkBoardLike.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SnkBoardLike, //
    ]),
  ],
  providers: [
    SnkBoardsLikesResolver, //
    SnkBoardsLikesService,
  ],
})
export class SnkBoardsLikesModule {}
