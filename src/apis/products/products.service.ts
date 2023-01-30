import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from '../productCategories/entities/productCategory.entity';
import { ProductImage } from '../productsImages/entities/productImage.entity';
import { Product } from './entities/product.entity';

/**
 * Product Service
 */
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, //

    @InjectRepository(ProductImage)
    private readonly productImagesRepository: Repository<ProductImage>, //

    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>, //
  ) {}

  async findOne({ productId }) {
    return await this.productsRepository.findOne({
      where: { id: productId },
      relations: {
        user: true,
        productCategory: true,
        productLikes: true,
        productImages: true,
      },
      order: { productImages: { isMain: 'DESC' } },
    });
  }

  async findAll({ page }) {
    return await this.productsRepository.find({
      skip: page ? (page - 1) * 50 : 0, // page당 50개씩 조회
      take: 50,
      relations: {
        user: true,
        productCategory: true,
        productLikes: true,
        productImages: true,
      },
      order: { productImages: { isMain: 'DESC' } },
    });
  }

  async create({ createProductInput }) {
    const { productCategory, productImages, ...product } = createProductInput;

    const checkCategory = await this.productCategoryRepository.findOne({
      where: { category: productCategory },
    });
    if (!checkCategory) new ConflictException('존재하지 않는 카테고리입니다.');

    // product 정보 저장
    const result = await this.productsRepository.save({
      ...product,
      productCategory: { id: checkCategory.id },
    });

    // 4. 이미지 생성 후 연결하기
    await Promise.all(
      productImages.map(
        (img: any, idx: number) =>
          new Promise(async (resolve, reject) => {
            try {
              const isMain = idx === 0 ? true : false;
              const newImg = await this.productImagesRepository.save({
                img,
                isMain,
                product: { id: result.id }, // 1:N 관계 데이터 연결
              });
              resolve(newImg);
            } catch (e) {
              reject(e);
            }
          }),
      ),
    );
    return result; // 생성된 데이터 정보 리턴
  }

  async update({ productId, updateProductInput }) {
    const { productImages, productCategory, ...product } = updateProductInput;

    // const originProduct = await this.productsRepository.findOne({
    //   where: { id: productId },
    //   relations: {
    //     user: true,
    //     productCategory: true,
    //     productLikes: true,
    //     productImages: true,
    //   },
    //   order: { productImages: { isMain: 'DESC' } },
    // });

    const result = await this.productsRepository.save({
      ...product,
      ...updateProductInput,
      id: productId,
      productCategory: productCategory,
    });
    if (productImages) {
      await this.productImagesRepository.delete({ product: { id: result.id } });
      await Promise.all(
        productImages.map(
          (el: any, idx: number) =>
            new Promise(async (resolve) => {
              const image = el;
              const isMain = idx === 0 ? true : false;
              const newImage = await this.productImagesRepository.save({
                img: image,
                isMain: isMain,
                product: { id: result.id },
              });
              resolve(newImage);
            }),
        ),
      );
    }
    return result;
  }

  async delete({ productId }) {
    const result = await this.productsRepository.softDelete({
      id: productId,
    });
    return result.affected ? true : false;
  }
}
