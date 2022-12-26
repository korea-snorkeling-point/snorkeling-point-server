import { Resolver } from '@nestjs/graphql';
import { SnkBoardImagesService } from './snkBoardsImages.service';

@Resolver()
export class SnkBoardImagesResolver {
  constructor(
    private readonly snkBoardImageService: SnkBoardImagesService, //
  ) {}
}
