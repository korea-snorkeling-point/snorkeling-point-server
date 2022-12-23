import { Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';

/**
 * Product GraphQL API Resolver
 * @APIs `createProduct`, `fetchProduct`, `updateProduct`, `deleteProduct`
 */
@Resolver()
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}
}
