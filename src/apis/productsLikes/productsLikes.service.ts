import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductLike } from './entities/productLike.entity';

/**
 * ProductLike Service
 */
@Injectable()
export class ProductsLikesService {
  constructor(
    @InjectRepository(ProductLike)
    private readonly productsLikesRepository: Repository<ProductLike>,
  ) {}

  async findOne({ userId, productId }) {
    const result = await this.productsLikesRepository.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });

    return result ? true : false;
  }

  async create({ userId, productId }) {
    const isCreated = await this.productsLikesRepository.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });

    if (isCreated)
      throw new ConflictException('이미 좋아요를 누르신 상품입니다.');

    const result = this.productsLikesRepository.create({
      user: { id: userId },
      product: { id: productId },
    });

    return result;
  }

  async delete({ userId, productId }) {
    const result = await this.productsLikesRepository.softDelete({
      user: { id: userId },
      product: { id: productId },
    });

    return result.affected ? true : false;
  }
}
