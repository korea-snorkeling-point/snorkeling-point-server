import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BuddyBoard } from 'src/apis/buddyBoards/entities/buddyBoard.entity';

@Entity()
@ObjectType()
export class BuddyBoardImage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  img: string;

  @Column()
  @Field(() => Boolean)
  isMain: boolean;

  // BuddyBoardImage : BuddyBoard - N : 1 연결
  @JoinColumn()
  @ManyToOne(() => BuddyBoard, (buddyBoard) => buddyBoard.buddyBoardImages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => BuddyBoard)
  buddyBoard: BuddyBoard;
}
