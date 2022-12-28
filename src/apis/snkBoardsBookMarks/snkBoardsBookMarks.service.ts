import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SnkBoardBookMark } from './entities/snkBoardBookMark.entity';

/**
 * SnkBoardBookMark Service
 */
@Injectable()
export class SnkBoardsBookMarksService {
  constructor(
    @InjectRepository(SnkBoardBookMark)
    private readonly snkBoardsBookMarksRepository: Repository<SnkBoardBookMark>,
  ) {}
}
