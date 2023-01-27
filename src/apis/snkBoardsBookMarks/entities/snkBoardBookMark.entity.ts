import { Field, ObjectType } from '@nestjs/graphql';
import { SnkBoard } from 'src/apis/snkBoards/entities/snkBoard.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class SnkBoardBookMark {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

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

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;
}
