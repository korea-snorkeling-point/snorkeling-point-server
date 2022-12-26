import { Field, Float, ObjectType } from '@nestjs/graphql';
import { AddrOne } from 'src/apis/addrOnes/entities/addrOne.entity';
import { AddrTwo } from 'src/apis/addrTwos/entities/addrTwo.entity';
import { BuddyBoard } from 'src/apis/buddyBoards/entities/buddyBoard.entity';
import { SnkBoardImage } from 'src/apis/snkBoardsImages/entities/snkBoardImage.entity';
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

  @Column()
  @Field(() => String)
  addrDetail: string;

  // location 을 따로 table 분리해야 할지 여부 고려
  @Column({ type: 'double' })
  @Field(() => Float)
  lat: number;

  @Column({ type: 'double' })
  @Field(() => Float)
  lng: number;

  // SnkBoard : BuddyBoard - 1 : N 관계
  @OneToMany(() => BuddyBoard, (buddyBoards) => buddyBoards.snkBoard, {
    cascade: true,
  })
  @Field(() => [BuddyBoard])
  buddyBoards: BuddyBoard[];

  // SnkBoard : AddrOne - N : 1 관계
  @JoinColumn()
  @ManyToOne(() => AddrOne, (addrOne) => addrOne.snkBoards)
  @Field(() => AddrOne)
  addrOne: AddrOne;

  // SnkBoard : addrTwo - N : 1 관계
  @JoinColumn()
  @ManyToOne(() => AddrTwo, (addrTwo) => addrTwo.snkBoards)
  @Field(() => AddrTwo)
  addrTwo: AddrTwo;

  // SnkBoard : SnkBoardImage - 1 : N 관계
  @OneToMany(() => SnkBoardImage, (snkBoardImage) => snkBoardImage.snkBoard, {
    cascade: true,
  })
  @Field(() => [SnkBoardImage])
  snkBoardImages: SnkBoardImage[];

  // SnkBoard : SnkBoardTag - M : N 연결
  @JoinTable()
  @Field(() => [SnkBoardTag])
  @ManyToMany(() => SnkBoardTag, (snkBoardTags) => snkBoardTags.snkBoards, {
    cascade: true,
  })
  snkBoardTags: SnkBoardTag[];
}
