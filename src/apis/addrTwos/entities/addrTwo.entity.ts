import { Field, ObjectType } from '@nestjs/graphql';
import { SnkBoard } from 'src/apis/snkBoards/entities/snkBoard.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class AddrTwo {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  addr: string;

  // AddrOne : SnkBoard - 1 : N 관계
  @OneToMany(() => SnkBoard, (snkBoards) => snkBoards.addrTwo)
  @Field(() => [SnkBoard])
  snkBoards: SnkBoard[];
}
