import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuddyBoardComment } from './entities/buddyBoardComment.entity';

@Injectable()
export class BuddyBoardsCommentsService {
  constructor(
    @InjectRepository(BuddyBoardComment)
    private readonly buddyBoardCommentRepository: Repository<BuddyBoardComment>,
  ) {}
}
