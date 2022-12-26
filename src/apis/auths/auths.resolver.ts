import { Resolver } from '@nestjs/graphql';
import { AuthsService } from './auths.service';

@Resolver()
export class AuthsResolver {
  constructor(
    private readonly authsService: AuthsService, //
  ) {}
}
