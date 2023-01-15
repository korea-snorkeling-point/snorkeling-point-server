import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateSnkBoardInput } from './dto/createSnkBoard.input';
import { UpdateSnkBoardInput } from './dto/updateSnkBoard.input';
import { SnkBoard } from './entities/snkBoard.entity';
import { SnkBoardsService } from './snkBoards.service';

@Resolver()
export class SnkBoardsResolver {
  constructor(
    private readonly snkBoardsService: SnkBoardsService, //
  ) {}

  @Query(() => SnkBoard, { description: 'Return : id 값으로 조회된 SnkBoard 정보' })
  fetchSnkBoard(
    @Args('snkBoardId', { description: 'SnkBoard Id' }) snkBoardId: string, //
  ) {
    return this.snkBoardsService.findOne({ snkBoardId });
  }

  @Query(() => [SnkBoard], { description : 'Return : 스노클링 포인트 리스트'})
  fetchSnkBoards(
    @Args('page', {description: '조회할 페이지 수'}) page: number, //
  ) {
    return this.snkBoardsService.findAll({page});
  }

  @Mutation(() => SnkBoard, { description: 'Return : 생성된 SnkBoard' })
  createSnkBoard(
    @Args('createSnkBoardInput') createSnkBoardInput: CreateSnkBoardInput, //
  ) {
    return this.snkBoardsService.create({ createSnkBoardInput });
  }

  @Mutation(() => SnkBoard, { description: 'Return : 수정된 SnkBoard - 업데이트 로직 논의 필요 (버디보드 연결)' })
  updateSnkBoard(
    @Args('snkBoardId', { description: '수정할 SnkBoard Id' }) snkBoardId: string,
    @Args('updateSnkBoardInput') updateSnkBoardInput: UpdateSnkBoardInput,
  ) {
    return this.snkBoardsService.update({ snkBoardId, updateSnkBoardInput });
  }

  @Mutation(() => Boolean, { description: 'Return : 삭제 성공 여부' })
  deleteSnkBoard(
    @Args('snkBoardId', { description: '삭제할 스노클링보드 Id' }) snkBoardId: string, //
  ) {
    return this.snkBoardsService.delete({ snkBoardId });
  }
}
