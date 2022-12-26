import { Module } from '@nestjs/common';
import { AuthsResolver } from './auths.resolver';
import { AuthsService } from './auths.service';

@Module({
  imports: [],
  providers: [
    AuthsResolver, //
    AuthsService,
  ],
  controllers: [],
})
export class AuthsModule {}
