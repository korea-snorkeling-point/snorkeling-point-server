import { Resolver } from '@nestjs/graphql';
import { PaymentsService } from './payments.service';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { IamportsService } from '../imports/imports.services';

@Resolver()
export class PaymentsResolver {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly iamportsService: IamportsService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}
}
