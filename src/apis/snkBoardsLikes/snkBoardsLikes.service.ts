import {
  CACHE_MANAGER,
  //BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SnkBoard } from '../snkBoards/entities/snkBoard.entity';
import { SnkBoardLike } from './entities/snkBoardLike.entity';
import { Cache } from 'cache-manager';
import { User } from '../users/entities/user.entity';

/**
 * SnkBoardLike Service
 */
@Injectable()
export class SnkBoardsLikesService {
  constructor(
    @InjectRepository(SnkBoardLike)
    private readonly snkBoardsLikesRepository: Repository<SnkBoardLike>,

    @InjectRepository(SnkBoard)
    private readonly snkBoardsRepository: Repository<SnkBoard>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async findTopFiveBoards() {
    // 0. redis에 이미 저장된 데이터가 있다면, 레디스 내부 값 리턴
    const redisTopFive: SnkBoard[] | null = await this.cacheManager.get(
      'topFiveBoards',
    );
    if (redisTopFive) return redisTopFive;

    // 1. Like Board의 모든 데이터 불러오기
    const boardLikes = await this.snkBoardsLikesRepository.find({
      relations: {
        snkBoard: true,
      },
    });

    // 2. Like 갯수 세기
    // Like 를 받은 snkBoard 의 Like 를 세기 위한
    // map 함수 선언 및, map을 이용한 like count.
    const map = new Map();
    boardLikes.forEach((boardLike) => {
      let count = 0;
      // snkBoard uuid 값을 이용하여 map 함수 내에서 중복된 값 세기
      if (map.get(boardLike.snkBoard.id) === undefined) {
        map.set(boardLike.snkBoard.id, 1);
      } else count = map.get(boardLike.snkBoard.id);
      map.set(boardLike.snkBoard.id, count + 1);
    });

    // 3. 상위 5개 정렬하기
    let counted = [...map];
    counted.sort((a, b) => b[1] - a[1]);
    counted = counted.slice(0, 5);
    // 빈 값을 제외하고 채우기
    counted = counted.filter((e) => e);

    // -----------------------------------------
    // 결과값 ( top five boardIds ) 을 이용하여
    // SnkBoard 결과값 불러오기
    // -----------------------------------------

    const topFiveBoards: SnkBoard[] | null = [];
    for (const board of counted) {
      const snkBoardInfo = await this.snkBoardsRepository.findOne({
        where: { id: board[0] },
      });
      topFiveBoards.push(snkBoardInfo);
    }

    // 빈 값이 반환될 시, redis에 저장되지 않도록
    if (topFiveBoards.length !== 0) {
      await this.cacheManager.set('topFiveBoards', topFiveBoards, {
        ttl: 60 * 60, // redis에 검색결과 유지시간 - 1시간
      });
    }

    return topFiveBoards;
  }

  async findWhoLikesBoard({ snkBoardId }) {
    const selectedSnkBoardLikes = await this.snkBoardsLikesRepository.find({
      where: { snkBoard: { id: snkBoardId } },
      relations: {
        user: true,
      },
    });

    const result: User[] | null = [];
    for (const snkBoardLike of selectedSnkBoardLikes) {
      const user = await this.usersRepository.findOne({
        where: { id: snkBoardLike.user.id },
      });
      result.push(user);
    }

    return result;
  }

  async findLikedBoards({ userId }) {
    const result = await this.snkBoardsRepository.find({
      where: { snkBoardLikes: { user: { id: userId } } },
      relations: {
        addrOne: true,
        addrTwo: true,
        snkBoardTags: true,
        snkBoardImages: true,
        snkBoardLikes: true,
        snkBoardBookMarks: true,
        buddyBoards: true,
      },
      order: { snkBoardImages: { isMain: 'DESC' } },
    });

    return result;
  }

  async findAll({ userId }) {
    const result = await this.snkBoardsLikesRepository.find({
      where: { user: { id: userId } },
      relations: {
        user: true,
        snkBoard: true,
      },
    });

    return result;
  }

  async findOne({ userId, snkBoardId }) {
    const result = await this.snkBoardsLikesRepository.findOne({
      where: { user: { id: userId }, snkBoard: { id: snkBoardId } },
    });

    return result ? true : false;
  }

  // SoftDelete 처리된 Like 찾기
  async findDeletedOne({ userId, snkBoardId }) {
    const result = await this.snkBoardsLikesRepository.findOne({
      where: { user: { id: userId }, snkBoard: { id: snkBoardId } },
      withDeleted: true,
    });

    return result.deletedAt ? true : false;
  }

  async create({ userId, snkBoardId }) {
    const isCreated = await this.snkBoardsLikesRepository.findOne({
      where: { user: { id: userId }, snkBoard: { id: snkBoardId } },
      withDeleted: true,
    });

    if (isCreated) {
      if (isCreated.deletedAt)
        // throw new BadRequestException('좋아요가 삭제처리된 게시글입니다.');
        return await this.restoreDeleted({ userId, snkBoardId });
      else throw new ConflictException('이미 좋아요를 누르신 게시글입니다.');
    }

    const result = this.snkBoardsLikesRepository.save({
      user: { id: userId },
      snkBoard: { id: snkBoardId },
    });

    return result ? true : false;
  }

  async delete({ userId, snkBoardId }) {
    const result = await this.snkBoardsLikesRepository.softDelete({
      user: { id: userId },
      snkBoard: { id: snkBoardId },
    });

    return result.affected ? true : false;
  }

  async restoreDeleted({ userId, snkBoardId }) {
    const result = await this.snkBoardsLikesRepository.restore({
      user: { id: userId },
      snkBoard: { id: snkBoardId },
    });

    return result.affected ? true : false;
  }
}
