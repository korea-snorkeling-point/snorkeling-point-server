import { NotFoundException } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { SnkBoard } from '../snkBoards/entities/snkBoard.entity';
import { SnkBoardLike } from './entities/snkBoardLike.entity';
import { SnkBoardsLikesService } from './snkBoardsLikes.service';

@Resolver()
export class SnkBoardsLikesResolver {
  constructor(
    private readonly snkBoardsLikesService: SnkBoardsLikesService, //
  ) {}

  @Query(() => [SnkBoard], { description: 'Return : 좋아요 Top Five SnkBoards' })
  fetchTopFiveSnkBoards() {
    return this.snkBoardsLikesService.findTopFiveBoards();
  }

  @Query(() => [SnkBoardLike], { description: 'Return : User의 모든 SnkboardLike'})
  fetchUserSnkLikes(
    @Args('userId', { description: '사용자 id' }) userId: string,
  ){
    return this.snkBoardsLikesService.findAll({ userId });
  }

  @Query(() => Boolean, { description: 'Return : 해당 Board의 유저 Like 여부' })
  fetchSnkLike(
    @Args('userId', { description: '사용자 id' }) userId: string,
    @Args('snkBoardId', { description: 'snkBoard id' }) snkBoardId: string,
  ) {
    return this.snkBoardsLikesService.findOne({ userId, snkBoardId });
  }

  @Mutation(() => Boolean, { description: 'Return : 좋아요 생성 성공 여부' })
  createSnkLike(
    @Args('userId', { description: '사용자 id' }) userId: string,
    @Args('snkBoardId', { description: 'snkBoard id' }) snkBoardId: string,
  ) {
    return this.snkBoardsLikesService.create({ userId, snkBoardId });
  }

  @Mutation(() => Boolean, { description: 'Return : 좋아요 삭제 성공 여부' })
  deleteSnkLike(
    @Args('userId', { description: '사용자 id' }) userId: string,
    @Args('snkBoardId', { description: 'snkBoard id' }) snkBoardId: string,
  ) {
    return this.snkBoardsLikesService.delete({ userId, snkBoardId });
  }

  @Mutation(() => Boolean, { description: 'Return : 좋아요 삭제 복구 여부' })
  async restoreSnkLike(
    @Args('userId', { description: '사용자 id' }) userId: string,
    @Args('snkBoardId', { description: 'snkBoard id' }) snkBoardId: string,
  ) {
    const fetchDeletedLike = await this.snkBoardsLikesService.findDeletedOne({ userId, snkBoardId });
    if(fetchDeletedLike)
      return this.snkBoardsLikesService.restoreDeleted({ userId, snkBoardId });
    else
      throw new NotFoundException("좋아요 삭제 기록이 없습니다.");
  }

}
