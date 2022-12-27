import { Field, ObjectType } from '@nestjs/graphql';
import { BuddyBoardComment } from 'src/apis/buddyBoardsComments/entities/buddyBoardComment.entity';
import { BuddyBoardSubComment } from 'src/apis/buddyBoardsSubComments/entities/buddyBoardSubComment.entity';
import { BuddyChatMessage } from 'src/apis/buddyChatMessages/entities/buddyChatMessage.entity';
import { BuddyParty } from 'src/apis/buddyParties/entities/buddyParty.entity';
import { Payment } from 'src/apis/payments/entities/payment.entity';
import { SnkBoardBookMark } from 'src/apis/snkBoardsBookMarks/entities/snkBoardBookMark.entity';
import { SnkBoardLike } from 'src/apis/snkBoardsLikes/entities/snkBoardLike.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  password: string;

  @Column({ default: 'default img addr' })
  @Field(() => String)
  profileImg: string;

  @Column()
  @Field(() => String)
  nickname: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  // User : Payment - 1 : N 관계
  @OneToMany(() => Payment, (payments) => payments.user)
  @Field(() => [Payment])
  payments: Payment[];

  // User : BuddyParty - 1 : N 관계
  @OneToMany(() => BuddyParty, (buddyParties) => buddyParties.user)
  @Field(() => [BuddyParty])
  buddyParties: BuddyParty[];

  // User : BuddyBoardComment - 1 : N 관계
  @OneToMany(
    () => BuddyBoardComment,
    (buddyBoardComments) => buddyBoardComments.user,
  )
  @Field(() => [BuddyBoardComment])
  buddyBoardComments: BuddyBoardComment[];

  // User : BuddyBoardSubComment - 1 : N 관계
  @OneToMany(
    () => BuddyBoardSubComment,
    (buddyBoardSubComments) => buddyBoardSubComments.user,
  )
  @Field(() => [BuddyBoardSubComment])
  buddyBoardSubComments: BuddyBoardSubComment[];

  // User : BuddyChatMessage - 1 : N 관계
  @OneToMany(
    () => BuddyChatMessage,
    (buddyChatMessages) => buddyChatMessages.user,
  )
  @Field(() => [BuddyChatMessage])
  buddyChatMessages: BuddyChatMessage[];

  // User : SnkBoardLike - 1 : N 관계
  @OneToMany(() => SnkBoardLike, (snkBoardLikes) => snkBoardLikes.user)
  @Field(() => [SnkBoardLike])
  snkBoardLikes: SnkBoardLike[];

  // User : SnkBoardBookMark - 1 : N 관계
  @OneToMany(
    () => SnkBoardBookMark,
    (snkBoardBookMarks) => snkBoardBookMarks.user,
  )
  @Field(() => [SnkBoardBookMark])
  snkBoardBookMarks: SnkBoardBookMark[];
}
