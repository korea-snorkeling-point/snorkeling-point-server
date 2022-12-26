import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnkBoardsTagsResolver } from './snkBoardsTags.resolver';
import { SnkBoardsTagsService } from './snkBoardsTags.service';
import { SnkBoardTag } from './entities/snkBoardTag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SnkBoardTag, //
    ]),
  ],
  providers: [
    SnkBoardsTagsResolver, //
    SnkBoardsTagsService,
  ],
})
export class SnkBoardsTagsModule {}
