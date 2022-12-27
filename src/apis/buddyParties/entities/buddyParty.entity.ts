import { Field, ObjectType } from '@nestjs/graphql';
import { BuddyBoard } from 'src/apis/buddyBoards/entities/buddyBoard.entity';
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
export class BuddyParty {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  role: string;

  // BuddyParty : User - N : 1 연결
  @JoinColumn()
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.buddyParties)
  user: User;

  // BuddyParty : BuddyBoard - N : 1 연결
  @JoinColumn()
  @Field(() => BuddyBoard)
  @ManyToOne(() => BuddyBoard, (buddyBoard) => buddyBoard.buddyParties)
  buddyBoard: BuddyBoard;
}
