import { Injectable } from '@nestjs/common';
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
}
