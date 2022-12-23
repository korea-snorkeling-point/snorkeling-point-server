import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuddyChatMessage } from './entities/buddyChatMessage.entity';

@Injectable()
export class BuddyChatMessagesService {
  constructor(
    @InjectRepository(BuddyChatMessage)
    private readonly chatMessagesRepository: Repository<BuddyChatMessage>,
  ) {}
}
