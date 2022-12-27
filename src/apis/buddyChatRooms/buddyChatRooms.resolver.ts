import { Resolver } from '@nestjs/graphql';
import { BuddyChatRoomsService } from './buddyChatRooms.service';

@Resolver()
export class BuddyChatRoomsResolver {
  constructor(
    private readonly buddyChatRoomsService: BuddyChatRoomsService, //
  ) {}
}
