import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuddyBoard } from '../buddyBoards/entities/buddyBoard.entity';
import { BuddyBoardImage } from './entities/buddyBoardImage.entity';

@Injectable()
export class BuddyBoardImagesService {
  constructor(
    @InjectRepository(BuddyBoardImage)
    private readonly buddyBoardImagesRepository: Repository<BuddyBoardImage>,

    @InjectRepository(BuddyBoard)
    private readonly dogsRepository: Repository<BuddyBoard>,
  ) {}
}
