import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuddyChatMessage } from '../buddyChatMessages/entities/buddyChatMessage.entity';
import { BuddyChatRoom } from './entities/buddyChatRoom.entity';

@Injectable()
export class BuddyChatRoomsService {
  constructor(
    @InjectRepository(BuddyChatRoom)
    private readonly buddyChatRoomsRepository: Repository<BuddyChatRoom>,

    @InjectRepository(BuddyChatMessage)
    private readonly buddyChatMessagesRepository: Repository<BuddyChatMessage>,
  ) {}
}
