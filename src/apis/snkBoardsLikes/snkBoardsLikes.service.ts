import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SnkBoard } from '../snkBoards/entities/snkBoard.entity';
import { SnkBoardLike } from './entities/snkBoardLike.entity';

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
  ) {}

  async findTopFiveBoards() {
    throw new Error('아직 구현되지 않았습니다.');
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
        buddyBoards: true
      },
      order: { snkBoardImages: {isMain: 'DESC'} },
    });

    return result;
  }

  async findAll({ userId }) {
    const result = await this.snkBoardsLikesRepository.find({
      where: { user: { id: userId } },
      relations: {
        user: true,
        snkBoard: true,
      }
    });

    return result;
  }

  async findOne({ userId, snkBoardId }) {
    const result = await this.snkBoardsLikesRepository.findOne({
      where: { user: { id: userId }, snkBoard: { id: snkBoardId } }
    });

    return result ? true : false;
  }

  // SoftDelete 처리된 Like 찾기
  async findDeletedOne({ userId, snkBoardId }) {
    const result = await this.snkBoardsLikesRepository.findOne({
      where: { user: { id: userId }, snkBoard: { id: snkBoardId } },
      withDeleted: true,
    });

    return result.deletedAt? true : false;
  }

  async create({ userId, snkBoardId }) {
    const isCreated = await this.snkBoardsLikesRepository.findOne({
      where: { user: { id: userId }, snkBoard: { id: snkBoardId } },
      withDeleted: true,
    });

    if(isCreated){
      if(isCreated.deletedAt)
      // throw new BadRequestException('좋아요가 삭제처리된 게시글입니다.');
        return await this.restoreDeleted({ userId, snkBoardId });
      else
        throw new ConflictException('이미 좋아요를 누르신 게시글입니다.');
    }
     

    const result = this.snkBoardsLikesRepository.save({
      user: { id: userId },
      snkBoard: { id: snkBoardId }
    });

    return result ? true : false;
  }

  async delete({ userId, snkBoardId }) {
    const result = await this.snkBoardsLikesRepository.softDelete({
      user: { id: userId },
      snkBoard: { id: snkBoardId }
    });

    return result.affected ? true : false;
  }

  async restoreDeleted({ userId, snkBoardId }) {
    const result = await this.snkBoardsLikesRepository.restore({
      user: { id: userId },
      snkBoard: { id: snkBoardId }
    });

    return result.affected ? true : false;
  }
}
