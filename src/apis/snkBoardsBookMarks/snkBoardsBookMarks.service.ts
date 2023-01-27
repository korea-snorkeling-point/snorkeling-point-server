import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SnkBoard } from '../snkBoards/entities/snkBoard.entity';
import { SnkBoardBookMark } from './entities/snkBoardBookMark.entity';

/**
 * SnkBoardBookMark Service
 */
@Injectable()
export class SnkBoardsBookMarksService {
  constructor(
    @InjectRepository(SnkBoardBookMark)
    private readonly snkBoardsBookMarksRepository: Repository<SnkBoardBookMark>,

    @InjectRepository(SnkBoard)
    private readonly snkBoardsRepository: Repository<SnkBoard>,
  ) {}

  async findBookMarkedBoards({ userId }) {
    const result = await this.snkBoardsRepository.find({
      where: { snkBoardBookMarks: { user: { id: userId } } },
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
    const result = await this.snkBoardsBookMarksRepository.find({
      where: { user: { id: userId } },
      relations: {
        snkBoard: true,
        user: true
      }
    });

    return result;
  }

  async findOne({ userId, snkBoardId }) {
    const result = await this.snkBoardsBookMarksRepository.findOne({
      where: { user: { id: userId }, snkBoard: { id: snkBoardId } }
    });

    return result? true : false;
  }

  // SoftDelete 처리된 BookMark 찾기
  async findDeletedOne({ userId, snkBoardId }) {
    const result = await this.snkBoardsBookMarksRepository.findOne({
      where: { user: { id: userId }, snkBoard: { id: snkBoardId } },
      withDeleted: true,
    });

    return result.deletedAt? true : false;
  }

  async create({ userId, snkBoardId }) {
    const isCreated = await this.snkBoardsBookMarksRepository.findOne({
      where: { user: { id: userId }, snkBoard: { id: snkBoardId } },
      withDeleted: true,
    });

    if(isCreated){
      if(isCreated.deletedAt)
      // throw new BadRequestException('북마크가 삭제처리된 게시글입니다.');
        return await this.restoreDeleted({ userId, snkBoardId });
      else
        throw new ConflictException('이미 북마크가 생성된 게시글입니다.');
    }

    const result = this.snkBoardsBookMarksRepository.save({
      user: { id: userId },
      snkBoard: { id: snkBoardId }
    });

    return result ? true : false;
  }

  async delete({ userId, snkBoardId }) {
    const result = await this.snkBoardsBookMarksRepository.softDelete({
      user: { id: userId },
      snkBoard: { id: snkBoardId }
    });

    return result.affected ? true : false;
  }

  async restoreDeleted({ userId, snkBoardId }) {
    const result = await this.snkBoardsBookMarksRepository.restore({
      user: { id: userId },
      snkBoard: { id: snkBoardId }
    });

    return result.affected ? true : false;
  }
}
