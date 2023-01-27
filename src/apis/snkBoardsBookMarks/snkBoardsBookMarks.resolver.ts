import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SnkBoard } from '../snkBoards/entities/snkBoard.entity';
import { SnkBoardBookMark } from './entities/snkBoardBookMark.entity';
import { SnkBoardsBookMarksService } from './snkBoardsBookMarks.service';

@Resolver()
export class SnkBoardsBookMarksResolver {
  constructor(
    private readonly snkBoardsBookMarksService: SnkBoardsBookMarksService, //
  ) {}

  @Query(() => [SnkBoard], { description: 'Return : User가 BookMark한 SnkBoards' })
  fetchBookMarkedSnkBoards(
    @Args('userId', { description: '사용자 id' }) userId: string,
  ){
    return this.snkBoardsBookMarksService.findBookMarkedBoards({ userId });
  }

  @Query(() => [SnkBoardBookMark], { description: 'Return : User의 BookMarks 정보' })
  fetchUserSnkBookMarks(
    @Args('userId', { description: '사용자 id' }) userId: string,
  ){
    return this.snkBoardsBookMarksService.findAll({ userId });
  }

  @Query(() => Boolean, { description: 'Return : 해당 Board의 유저 BookMark 여부' })
  fetchSnkBookMarks(
    @Args('userId', { description: '사용자 id' }) userId: string,
    @Args('snkBoardId', { description: 'snkBoard id' }) snkBoardId: string,
  ) {
    return this.snkBoardsBookMarksService.findOne({ userId, snkBoardId });
  }

  @Mutation(() => Boolean, { description: 'Return : 북마크 생성 성공 여부' })
  createSnkBookMark(
    @Args('userId', { description: '사용자 id' }) userId: string,
    @Args('snkBoardId', { description: 'snkBoard id' }) snkBoardId: string,
  ) {
    return this.snkBoardsBookMarksService.create({ userId, snkBoardId });
  }

  @Mutation(() => Boolean, { description: 'Return : 북마크 삭제 성공 여부' })
  deleteSnkBookMark(
    @Args('userId', { description: '사용자 id' }) userId: string,
    @Args('snkBoardId', { description: 'snkBoard id' }) snkBoardId: string,
  ) {
    return this.snkBoardsBookMarksService.delete({ userId, snkBoardId });
  }

  @Mutation(() => Boolean, { description: 'Return : 북마크 삭제 복구 여부' })
  async restoreSnkBookMark(
    @Args('userId', { description: '사용자 id' }) userId: string,
    @Args('snkBoardId', { description: 'snkBoard id' }) snkBoardId: string,
  ) {
    const fetchDeletedBookMark = await this.snkBoardsBookMarksService.findDeletedOne({ userId, snkBoardId });
    if(fetchDeletedBookMark)
      return this.snkBoardsBookMarksService.restoreDeleted({ userId, snkBoardId });
    else
      throw new NotFoundException("북마크 삭제 기록이 없습니다.");
  }
}
