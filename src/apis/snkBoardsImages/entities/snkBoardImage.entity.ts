import { Field, ObjectType } from '@nestjs/graphql';
import { SnkBoard } from 'src/apis/snkBoards/entities/snkBoard.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class SnkBoardImage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  img: string;

  @Column()
  @Field(() => Boolean)
  isMain: boolean;

  // SnkBoardImage : SnkBoard - N : 1 연결
  @ManyToOne(() => SnkBoard, (snkBoard) => snkBoard.snkBoardImages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => SnkBoard)
  snkBoard: SnkBoard;
}
