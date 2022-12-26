import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SnkBoard } from '../snkBoards/entities/snkBoard.entity';
import { SnkBoardImage } from './entities/buddyBoardImage.entity';

@Injectable()
export class SnkBoardImagesService {
  constructor(
    @InjectRepository(SnkBoardImage)
    private readonly snkBoardImagesRepository: Repository<SnkBoardImage>,

    @InjectRepository(SnkBoard)
    private readonly dogsRepository: Repository<SnkBoard>,
  ) {}
}
