import { Resolver } from '@nestjs/graphql';
import { AdminUsersService } from './adminUsers.service';
@Resolver()
export class AdminUsersResolver {
  constructor(
    private readonly adminUsersService: AdminUsersService, //
  ) {}
}
