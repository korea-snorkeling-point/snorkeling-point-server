import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuddyPartiesResolver } from './buddyParties.resolver';
import { BuddyPartiesService } from './buddyParties.service';
import { BuddyParty } from './entities/buddyParty.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BuddyParty, //
    ]),
  ],
  providers: [
    BuddyPartiesResolver, //
    BuddyPartiesService,
  ],
})
export class BuddyPartiesModule {}
