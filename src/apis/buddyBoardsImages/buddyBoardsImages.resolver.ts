import { Resolver } from '@nestjs/graphql';
import { BuddyBoardImagesService } from './buddyBoardsImages.service';

@Resolver()
export class BuddyBoardImagesResolver {
  constructor(
    private readonly buddyBoardImageService: BuddyBoardImagesService, //
  ) {}
}
