import { Resolver } from '@nestjs/graphql';
import { BuddyChatMessagesService } from './buddyChatMessages.service';

@Resolver()
export class BuddyChatMessagesResolver {
  constructor(
    private readonly chatMessagesService: BuddyChatMessagesService, //
  ) {}
}
