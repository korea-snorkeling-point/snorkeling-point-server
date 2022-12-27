import { Field, ObjectType } from '@nestjs/graphql';
import { BuddyBoard } from 'src/apis/buddyBoards/entities/buddyBoard.entity';
import { BuddyBoardSubComment } from 'src/apis/buddyBoardsSubComments/entities/buddyBoardSubComment.entity';
import { User } from 'src/apis/users/entities/user.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class BuddyBoardComment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  comment: string;

  // buddyBoardComment : BuddyBoard - N : 1 관계
  @JoinColumn()
  @ManyToOne(() => BuddyBoard, (buddyBoard) => buddyBoard.buddyBoardComments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => BuddyBoard)
  buddyBoard: BuddyBoard;

  // BuddyBoardComment : User - N : 1 관계
  @JoinColumn()
  @ManyToOne(() => User, (user) => user.buddyBoardComments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => User)
  user: User;

  // BuddyBoardComment : BuddyBoardSubComment - 1 : N 관계
  @OneToMany(
    () => BuddyBoardSubComment,
    (buddyBoardSubComments) => buddyBoardSubComments.buddyBoardComment,
  )
  @Field(() => [BuddyBoardSubComment])
  buddyBoardSubComments: BuddyBoardSubComment[];
}
