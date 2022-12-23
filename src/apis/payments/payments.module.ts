import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IamportsResolver } from '../imports/imports.resolver';
import { IamportsService } from '../imports/imports.services';
import { UsersService } from '../users/users.service';
import { Payment } from './entities/payment.entity';
import { PaymentsResolver } from './payments.resolver';
import { PaymentsService } from './payments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Payment, //
    ]),
  ],
  providers: [
    PaymentsResolver, //
    PaymentsService,
    IamportsResolver,
    IamportsService,
    UsersService,
  ],
})
export class PaymentsModule {}
