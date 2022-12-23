import { Field, ObjectType } from '@nestjs/graphql';
import { BuddyBoard } from 'src/apis/buddyBoards/entities/buddyBoard.entity';
import { BuddyChatMessage } from 'src/apis/buddyChatMessages/entities/buddyChatMessage.entity';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class BuddyChatRoom {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  // 채팅 상대 강아지의 id
  @Column()
  @Field(() => String)
  buddyChatPairId: string;

  // BuddyChatroom : BuddyBoard - N:1 연결
  @JoinColumn()
  @ManyToOne(() => BuddyBoard)
  @Field(() => BuddyBoard)
  buddyBoard: BuddyBoard;

  // BuddyChatRoom : BuddyChatMessage - 1:N 연결
  @OneToMany(
    () => BuddyChatMessage,
    (buddyChatMessage) => buddyChatMessage.buddyChatRoom,
    {
      cascade: true,
    },
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
