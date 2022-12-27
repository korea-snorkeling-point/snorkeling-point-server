import { Resolver } from '@nestjs/graphql';
import { BuddyPartiesService } from './buddyParties.service';

@Resolver()
export class BuddyPartiesResolver {
  constructor(
    private readonly buddyPartiesService: BuddyPartiesService, //
  ) {}
}
