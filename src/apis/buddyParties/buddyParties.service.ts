import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuddyParty } from './entities/buddyParty.entity';

/**
 * BuddyParty Service
 */
@Injectable()
export class BuddyPartiesService {
  constructor(
    @InjectRepository(BuddyParty)
    private readonly buddyPartiesRepository: Repository<BuddyParty>,
  ) {}
}
