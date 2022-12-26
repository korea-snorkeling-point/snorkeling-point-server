import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SnkBoardTag } from './entities/snkBoardTag.entity';

/**
 * SnkBoardTags Service
 */
@Injectable()
export class SnkBoardsTagsService {
  constructor(
    @InjectRepository(SnkBoardTag)
    private readonly snkBoardsTagsRepository: Repository<SnkBoardTag>,
  ) {}
}
