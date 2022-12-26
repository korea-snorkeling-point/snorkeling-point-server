import { Resolver } from '@nestjs/graphql';
import { SnkBoardImagesService } from './buddyBoardsImages.service';

@Resolver()
export class SnkBoardImagesResolver {
  constructor(
    private readonly snkBoardImageService: SnkBoardImagesService, //
  ) {}
}
