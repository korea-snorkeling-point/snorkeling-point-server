import { Field, Float, ObjectType } from '@nestjs/graphql';
import { AddrOne } from 'src/apis/addrOnes/entities/addrOne.entity';
import { AddrTwo } from 'src/apis/addrTwos/entities/addrTwo.entity';
import { BuddyBoard } from 'src/apis/buddyBoards/entities/buddyBoard.entity';
import { SnkBoardImage } from 'src/apis/snkBoardsImages/entities/snkBoardImage.entity';
import { SnkBoardLike } from 'src/apis/snkBoardsLikes/entities/snkBoardLike.entity';
import { SnkBoardBookMark } from 'src/apis/snkBoardsBookMarks/entities/snkBoardBookMark.entity';
import { SnkBoardTag } from 'src/apis/snkBoardsTags/entities/snkBoardTag.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class SnkBoard {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  subTitle: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column({ type: 'double' })
  @Field(() => Float)
  lat: number;

  @Column({ type: 'double' })
  @Field(() => Float)
  lng: number;

  // 대분류 (시/도)
  // SnkBoard : AddrOne - N : 1 관계
  @JoinColumn()
  @ManyToOne(() => AddrOne, (addrOne) => addrOne.snkBoards)
  @Field(() => AddrOne)
  addrOne: AddrOne;

  // 소분류 (시/군/구)
  // SnkBoard : addrTwo - N : 1 관계
  @JoinColumn()
  @ManyToOne(() => AddrTwo, (addrTwo) => addrTwo.snkBoards)
  @Field(() => AddrTwo)
  addrTwo: AddrTwo;

  // 나머지 주소
  @Column()
  @Field(() => String)
  addrDetail: string;

  // SnkBoard : BuddyBoard - 1 : N 관계
  @OneToMany(() => BuddyBoard, (buddyBoards) => buddyBoards.snkBoard, {
    cascade: true,
  })
  @Field(() => [BuddyBoard])
  buddyBoards: BuddyBoard[];

  // SnkBoard : SnkBoardImage - 1 : N 관계
  @OneToMany(() => SnkBoardImage, (snkBoardImage) => snkBoardImage.snkBoard, {
    cascade: true,
  })
  @Field(() => [SnkBoardImage])
  snkBoardImages: SnkBoardImage[];

  // SnkBoard : SnkBoardLike - 1 : N 관계
  @OneToMany(() => SnkBoardLike, (snkBoardLikes) => snkBoardLikes.user)
  @Field(() => [SnkBoardLike])
  snkBoardLikes: SnkBoardLike[];

  // SnkBoard : SnkBoardBookMark - 1 : N 관계
  @OneToMany(
    () => SnkBoardBookMark,
    (snkBoardBookMarks) => snkBoardBookMarks.user,
  )
  @Field(() => [SnkBoardBookMark])
  snkBoardBookMarks: SnkBoardBookMark[];

  // SnkBoard : SnkBoardTag - M : N 관계
  @JoinTable()
  @Field(() => [SnkBoardTag])
  @ManyToMany(() => SnkBoardTag, (snkBoardTags) => snkBoardTags.snkBoards, {
    cascade: true,
  })
  snkBoardTags: SnkBoardTag[];
}
