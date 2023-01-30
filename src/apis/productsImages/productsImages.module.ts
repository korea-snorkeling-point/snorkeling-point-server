import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { ProductImagesResolver } from './productsImages.resolver';
import { ProductImagesService } from './productsImages.service';
import { ProductImage } from './entities/productImage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductImage, //
      Product, //
    ]),
  ],
  providers: [
    ProductImagesResolver, //
    ProductImagesService,
  ],
})
export class ProductsImagesModule {}
