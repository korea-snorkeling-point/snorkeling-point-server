import { Resolver } from '@nestjs/graphql';
import { ProductCategoriesService } from './productCategories.service';

@Resolver()
export class ProductCategoriesResolver {
  constructor(
    private readonly productCategoriesService: ProductCategoriesService, //
  ) {}
}
