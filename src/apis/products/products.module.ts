import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from '../productCategories/entities/productCategory.entity';
import { ProductImage } from '../productsImages/entities/productImage.entity';
import { Product } from './entities/product.entity';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductImage, //
      ProductCategory, //
    ]),
  ],
  providers: [
    ProductsService, //
    ProductsResolver, //
  ],
})
export class ProductsModule {}
