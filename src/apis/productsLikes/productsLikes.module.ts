import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsLikesResolver } from './productsLikes.resolver';
import { ProductsLikesService } from './productsLikes.service';
import { ProductLike } from './entities/productLike.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductLike, //
    ]),
  ],
  providers: [
    ProductsLikesResolver, //
    ProductsLikesService,
  ],
})
export class ProductsLikesModule {}
