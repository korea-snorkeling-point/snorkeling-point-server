import { Field, ObjectType } from '@nestjs/graphql';
import { BuddyBoardComment } from 'src/apis/buddyBoardsComments/entities/buddyBoardComment.entity';
import { User } from 'src/apis/users/entities/user.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class BuddyBoardSubComment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  comment: string;

  // BuddyBoardSubComment : BuddyBoardComment - N : 1 관계
  @JoinColumn()
  @ManyToOne(
    () => BuddyBoardComment,
    (buddyBoardComment) => buddyBoardComment.buddyBoardSubComments,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @Field(() => BuddyBoardComment)
  buddyBoardComment: BuddyBoardComment;

  // BuddyBoardSubComment : User - N : 1 관계
  @JoinColumn()
  @ManyToOne(() => User, (user) => user.buddyBoardSubComments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => User)
  user: User;
}
