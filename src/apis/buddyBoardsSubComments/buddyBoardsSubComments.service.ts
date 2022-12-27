import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuddyBoardSubComment } from './entities/buddyBoardSubComment.entity';

@Injectable()
export class BuddyBoardsSubCommentsService {
  constructor(
    @InjectRepository(BuddyBoardSubComment)
    private readonly buddyBoardSubCommentRepository: Repository<BuddyBoardSubComment>,
  ) {}
}
