import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/productCategory.entity';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoriesRepositroy: Repository<ProductCategory>,
  ) {}

  async create({ productCategory }) {
    const newCategory = await this.productCategoriesRepositroy.save({
      category: productCategory,
    });

    return newCategory;
  }
}
