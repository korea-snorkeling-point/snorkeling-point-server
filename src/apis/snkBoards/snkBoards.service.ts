import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddrOne } from '../addrOnes/entities/addrOne.entity';
import { AddrTwo } from '../addrTwos/entities/addrTwo.entity';
import { SnkBoardImage } from '../snkBoardsImages/entities/snkBoardImage.entity';
import { SnkBoardTag } from '../snkBoardsTags/entities/snkBoardTag.entity';
import { SnkBoard } from './entities/snkBoard.entity';

@Injectable()
export class SnkBoardsService {
  constructor(
    @InjectRepository(SnkBoard)
    private readonly snkBoardsRepository: Repository<SnkBoard>, //

    @InjectRepository(AddrOne)
    private readonly addrOnesRepository: Repository<AddrOne>,

    @InjectRepository(AddrTwo)
    private readonly addrTwosRepository: Repository<AddrTwo>,

    @InjectRepository(SnkBoardImage)
    private readonly snkBoardImagesRepository: Repository<SnkBoardImage>,

    @InjectRepository(SnkBoardTag)
    private readonly snkBoardTagsRepository: Repository<SnkBoardTag>,
  ) {}

  async findOne({ snkBoardId }) {
    return await this.snkBoardsRepository.findOne({
      where: { id: snkBoardId },
      relations: {
        addrOne: true,
        addrTwo: true,
        snkBoardTags: true,
        snkBoardImages: true,
        snkBoardLikes: true,
        snkBoardBookMarks: true,
        buddyBoards: true,
      },
      order: { snkBoardImages: { isMain: 'DESC' } },
    });
  }

  async findAll({ page }) {
    return await this.snkBoardsRepository.find({
      skip: page ? (page - 1) * 50 : 0, // page당 50개씩 조회
      take: 50,
      relations: {
        addrOne: true,
        addrTwo: true,
        snkBoardTags: true,
        snkBoardImages: true,
        snkBoardLikes: true,
        snkBoardBookMarks: true,
        buddyBoards: true,
      },
      order: { snkBoardImages: { isMain: 'DESC' } },
    });
  }

  searchAll({ page, addrOne, addrTwo, titleSearch }) {
    return '검색기능은 아직 구현되지 않았습니다.';
  }

  async create({ createSnkBoardInput }) {
    const { addrOne, addrTwo, snkBoardImages, snkBoardTags, ...snkBoard } =
      createSnkBoardInput;

    // 1. addrOne, addrTwo 불러오기 (없으면 생성)
    let addrOneInfo: AddrOne;
    const checkAddrOne = await this.addrOnesRepository.findOne({
      where: { addr: addrOne },
    });
    if (checkAddrOne) addrOneInfo = checkAddrOne;
    else {
      const newAddrOne = await this.addrOnesRepository.save({
        addr: addrOne,
      });
      addrOneInfo = newAddrOne;
    }

    let addrTwoInfo: AddrTwo;
    const checkAddrTwo = await this.addrTwosRepository.findOne({
      where: { addr: addrTwo },
    });
    if (checkAddrTwo) addrTwoInfo = checkAddrTwo;
    else {
      const newAddrTwo = await this.addrTwosRepository.save({
        addr: addrTwo,
      });
      addrTwoInfo = newAddrTwo;
    }

    // 2. snkBoardTags 모두 등록하기
    const createdTags = await Promise.all(
      snkBoardTags.map(
        (tagName: string) =>
          new Promise(async (resolve, reject) => {
            try {
              const prevTag = await this.snkBoardTagsRepository.findOne({
                where: { name: tagName },
              });
              if (prevTag) {
                resolve(prevTag);
              } else {
                const newTag = await this.snkBoardTagsRepository.save({
                  name: tagName,
                });
                resolve(newTag);
              }
            } catch (e) {
              reject(e);
            }
          }),
      ),
    );

    // 3. snkBoard 정보 저장
    const result = await this.snkBoardsRepository.save({
      ...snkBoard,
      addrOne: { id: addrOneInfo.id }, // N:1 관계 데이터 연결
      addrTwo: { id: addrTwoInfo.id }, // N:1 관계 데이터 연결
      snkBoardTags: createdTags, // N:M 관계 데이터는 둘 중 하나만 연결하면 된다.
    });

    // 4. 이미지 생성 후 연결하기
    await Promise.all(
      snkBoardImages.map(
        (img: any, idx: number) =>
          new Promise(async (resolve, reject) => {
            try {
              const isMain = idx === 0 ? true : false;
              const newImg = await this.snkBoardImagesRepository.save({
                img,
                isMain,
                snkBoard: { id: result.id }, // 1:N 관계 데이터 연결
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

  async update({ snkBoardId, updateSnkBoardInput }) {
    const { addrOne, addrTwo, snkBoardImages, snkBoardTags, ...snkBoard } =
      updateSnkBoardInput;

    const originSnkBoard = await this.snkBoardsRepository.findOne({
      where: { id: snkBoardId },
      relations: {
        addrOne: true,
        addrTwo: true,
        snkBoardTags: true,
        snkBoardImages: true,
        snkBoardLikes: true,
        snkBoardBookMarks: true,
        buddyBoards: true,
      },
      order: { snkBoardImages: { isMain: 'DESC' } },
    });

    return originSnkBoard;
  }

  async delete({ snkBoardId }) {
    const result = await this.snkBoardsRepository.softDelete({
      id: snkBoardId,
    });
    return result.affected ? true : false;
  }
}
