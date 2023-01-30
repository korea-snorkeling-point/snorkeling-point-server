import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ProductLike } from './entities/productLike.entity';
import { ProductsLikesService } from './productsLikes.service';

@Resolver()
export class ProductsLikesResolver {
  constructor(
    private readonly productsLikesService: ProductsLikesService, //
  ) {}

  @Query(() => Boolean, { description: 'Return : 사용자의 Board Like 여부' })
  fetchProductLike(
    @Args('userId', { description: '사용자 id' }) userId: string,
    @Args('productId', { description: 'product id' }) productId: string,
  ) {
    return this.productsLikesService.findOne({ userId, productId });
  }

  @Mutation(() => ProductLike, {
    description: 'Return : 생성된 ProductLike 정보',
  })
  createProductLike(
    @Args('userId', { description: '사용자 id' }) userId: string,
    @Args('productId', { description: 'product id' }) productId: string,
  ) {
    return this.productsLikesService.create({ userId, productId });
  }

  @Mutation(() => Boolean, { description: 'Return : 좋아요 삭제 성공 여부' })
  deleteProductLike(
    @Args('userId', { description: '사용자 id' }) userId: string,
    @Args('productId', { description: 'product id' }) productId: string,
  ) {
    return this.productsLikesService.delete({ userId, productId });
  }
}
