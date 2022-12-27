import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUsersResolver } from './adminUsers.resolver';
import { AdminUsersService } from './adminUsers.service';
import { AdminUser } from './entities/adminUser.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdminUser, //
    ]),
  ],
  providers: [
    AdminUsersResolver, //
    AdminUsersService,
  ],
})
export class AdminUsersModule {}
