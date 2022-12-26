import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuddyChatMessage } from '../buddyChatMessages/entities/buddyChatMessage.entity';
import { BuddyChatRoomsResolver } from './buddyChatRooms.resolver';
import { BuddyChatRoomsService } from './buddyChatRooms.service';
import { BuddyChatRoom } from './entities/buddyChatRoom.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BuddyChatRoom, //
      BuddyChatMessage,
    ]),
  ],
  providers: [
    BuddyChatRoomsResolver, //
    BuddyChatRoomsService,
  ],
})
export class BuddyChatRoomsModule {}
