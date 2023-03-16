import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { FetchProductOutput } from './dto/fetchProduct.output';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => FetchProductOutput, { description: '상품 조회' })
  fetchProduct(
    @Args('productId') productId: string, //
    @Args('userId') userId: string, //
  ) {
    return this.productsService.findOne({ productId, userId });
  }

  @Query(() => [Product])
  fetchAllProducts(
    @Args('page', { description: '조회할 페이지 수' }) page: number, //
  ) {
    return this.productsService.findAll({ page });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput, //
  ) {
    return this.productsService.create({ createProductInput });
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('productId', { description: '수정할 상품 ID' }) productId: string, //
    @Args('updateProductInput') updateProductInput: UpdateProductInput, //
  ) {
    return this.productsService.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  deleteProduct(
    @Args('productId', { description: '삭제할 상품 ID' }) productId: string, //
  ) {
    return this.productsService.delete({ productId });
  }
}
