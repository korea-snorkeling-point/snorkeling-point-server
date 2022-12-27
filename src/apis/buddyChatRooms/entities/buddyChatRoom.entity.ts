import { Field, ObjectType } from '@nestjs/graphql';
import { BuddyBoard } from 'src/apis/buddyBoards/entities/buddyBoard.entity';
import { BuddyChatMessage } from 'src/apis/buddyChatMessages/entities/buddyChatMessage.entity';

import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class BuddyChatRoom {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  // BuddyChatroom : BuddyBoard - 1:1 연결
  @JoinColumn()
  @OneToOne(() => BuddyBoard, (buddyBoard) => buddyBoard.buddyChatRoom)
  @Field(() => BuddyBoard)
  buddyBoard: BuddyBoard;

  // BuddyChatRoom : BuddyChatMessage - 1:N 연결
  @OneToMany(
    () => BuddyChatMessage,
    (buddyChatMessage) => buddyChatMessage.buddyChatRoom,
    { cascade: true },
  )
  @Field(() => [BuddyChatMessage])
  buddyChatMessages: BuddyChatMessage[];

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;
}
