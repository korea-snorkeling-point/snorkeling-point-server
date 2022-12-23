import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuddyChatMessagesResolver } from './buddyChatMessages.resolver';
import { BuddyChatMessagesService } from './buddyChatMessages.service';
import { BuddyChatMessage } from './entities/buddyChatMessage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BuddyChatMessage, //
    ]),
  ],
  providers: [
    BuddyChatMessagesResolver, //
    BuddyChatMessagesService,
  ],
})
export class BuddyChatMessagesModule {}
