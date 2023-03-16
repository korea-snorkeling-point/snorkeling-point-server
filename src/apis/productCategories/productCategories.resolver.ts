import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductCategory } from './entities/productCategory.entity';
import { ProductCategoriesService } from './productCategories.service';

@Resolver()
export class ProductCategoriesResolver {
  constructor(
    private readonly productCategoriesService: ProductCategoriesService, //
  ) {}

  @Mutation(() => ProductCategory, { description: '상품 카테고리 등록' })
  createProductCategory(
    @Args('productCategory') productCategory: string, //
  ) {
    return this.productCategoriesService.create({ productCategory });
  }
}
