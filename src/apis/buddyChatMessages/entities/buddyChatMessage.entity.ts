import { Field, ObjectType } from '@nestjs/graphql';
import { BuddyChatRoom } from 'src/apis/buddyChatRooms/entities/buddyChatRoom.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class BuddyChatMessage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  // 메시지를 보낸 유저의 id
  @Column()
  @Field(() => String)
  senderId: string;

  // 보낸 메시지
  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  // BuddyChatMessage : BuddyChatroom - N:1 연결
  @JoinColumn()
  @Field(() => BuddyChatRoom)
  @ManyToOne(
    () => BuddyChatRoom,
    (buddyChatRoom) => buddyChatRoom.buddyChatMessages,
    { onDelete: 'CASCADE' },
  )
  buddyChatRoom: BuddyChatRoom;

  // BuddyChatMessage : User - N:1 연결
  @JoinColumn()
  @Field(() => User)
  @ManyToOne(
    () => User,
    (user) => user.buddyChatMessages,
    { onDelete: 'CASCADE' }, //
  )
  user: User;
}
