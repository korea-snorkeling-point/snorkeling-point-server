import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthsResolver } from './auths.resolver';
import { AuthsService } from './auths.service';

@Module({
  imports: [
    JwtModule.register({}), //
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    AuthsResolver, //
    AuthsService, //
    UsersService, //
    JwtRefreshStrategy, //
    JwtAccessStrategy,
  ],
  controllers: [],
})
export class AuthsModule {}
