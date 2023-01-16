import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SnkBoard } from 'src/apis/snkBoards/entities/snkBoard.entity';

@Entity()
@ObjectType()
export class SnkBoardTag {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  // SnkBoardTag : SnkBoard - N : M 연결
  @Field(() => [SnkBoard])
  @ManyToMany(() => SnkBoard, (snkBoards) => snkBoards.snkBoardTags)
  snkBoards: SnkBoard[];
}
