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
export class SnkBoardLike {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  // SnkBoardsLikes : User - N : 1 연결
  @JoinColumn()
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.snkBoardLikes)
  user: User;

  // SnkBoardsLikes : SnkBoard - N : 1 연결
  @JoinColumn()
  @Field(() => SnkBoard)
  @ManyToOne(() => SnkBoard, (snkBoard) => snkBoard.snkBoardLikes)
  snkBoard: SnkBoard;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
