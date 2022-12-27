import { Resolver } from '@nestjs/graphql';
import { SnkBoardsBookMarksService } from './snkBoardsBookMarks.service';

@Resolver()
export class SnkBoardsBookMarksResolver {
  constructor(
    private readonly snkBoardsBookMarksService: SnkBoardsBookMarksService, //
  ) {}
}
