import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SnkBoardLike } from './entities/snkBoardLike.entity';

/**
 * SnkBoardLike Service
 */
@Injectable()
export class SnkBoardsLikesService {
  constructor(
    @InjectRepository(SnkBoardLike)
    private readonly snkBoardsLikesRepository: Repository<SnkBoardLike>,
  ) {}

  async findTopFiveBoards() {
    throw new Error('아직 구현되지 않았습니다.');
  }

  async findOne({ userId, snkBoardId }) {
    const result = await this.snkBoardsLikesRepository.findOne({
      where: { user: { id: userId }, snkBoard: { id: snkBoardId } }
    });

    return result ? true : false;
  }

  async create({ userId, snkBoardId }) {
    const isCreated = await this.snkBoardsLikesRepository.findOne({
      where: { user: { id: userId }, snkBoard: { id: snkBoardId } }
    });

    if(isCreated) throw new ConflictException('이미 좋아요를 누르신 포인트입니다.');

    const result = this.snkBoardsLikesRepository.create({
      user: { id: userId },
      snkBoard: { id: snkBoardId }
    });

    return result;
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
