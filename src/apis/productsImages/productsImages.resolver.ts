import { Resolver } from '@nestjs/graphql';
import { ProductImagesService } from './productsImages.service';

@Resolver()
export class ProductImagesResolver {
  constructor(
    private readonly productImageService: ProductImagesService, //
  ) {}
}
