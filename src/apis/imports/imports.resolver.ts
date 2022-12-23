import { Resolver } from '@nestjs/graphql';
import { IamportsService } from './imports.services';

@Resolver()
export class IamportsResolver {
  constructor(
    private readonly iamportsService: IamportsService, //
  ) {}
}
