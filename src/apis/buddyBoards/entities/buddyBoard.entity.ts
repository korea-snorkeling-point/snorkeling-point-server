import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BuddyBoardImage } from 'src/apis/buddyBoardsImages/entities/buddyBoardImage.entity';
import { BuddyChatRoom } from 'src/apis/buddyChatRooms/entities/buddyChatRoom.entity';
import { SnkBoard } from 'src/apis/snkBoards/entities/snkBoard.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class BuddyBoard {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ nullable: true })
  @Field(() => [String], { nullable: true })
  guestIds: string[];

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => String)
  meetDate: string;

  @Column()
  @Field(() => Int)
  members: number;

  @Column({ default: false })
  @Field(() => Boolean)
  isFull: boolean;

  // BuddyBoard : SnkBoard - N : 1 관계
  @JoinColumn()
  @ManyToOne(() => SnkBoard, (snkBoard) => snkBoard.buddyBoards)
  @Field(() => SnkBoard)
  snkBoard: SnkBoard;

  // BuddyBoard : BuddyChatRoom - 1:1 연결
  @OneToOne(() => BuddyChatRoom, (buddyChatRoom) => buddyChatRoom.buddyBoard)
  @Field(() => BuddyChatRoom)
  buddyChatRoom: BuddyChatRoom;

  // BuddyBoard : BuddyBoardImage - 1 : N 관계
  @OneToMany(
    () => BuddyBoardImage,
    (buddyBoardImages) => buddyBoardImages.buddyBoard,
    {
      cascade: true,
    },
  )
  @Field(() => [BuddyBoardImage])
  buddyBoardImages: BuddyBoardImage[];
}
