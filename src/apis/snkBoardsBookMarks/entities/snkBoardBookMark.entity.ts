import { Field, ObjectType } from '@nestjs/graphql';
import { SnkBoard } from 'src/apis/snkBoards/entities/snkBoard.entity';
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
export class SnkBoardBookMark {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  role: string;

  // SnkBoardBookMarks : User - N : 1 연결
  @JoinColumn()
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.snkBoardBookMarks)
  user: User;

  // SnkBoardBookMarks : SnkBoard - N : 1 연결
  @JoinColumn()
  @Field(() => SnkBoard)
  @ManyToOne(() => SnkBoard, (snkBoard) => snkBoard.snkBoardBookMarks)
  snkBoard: SnkBoard;
}
