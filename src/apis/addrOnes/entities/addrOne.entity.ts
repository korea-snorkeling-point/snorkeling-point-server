import { Field, ObjectType } from '@nestjs/graphql';
import { SnkBoard } from 'src/apis/snkBoards/entities/snkBoard.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class AddrOne {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  addr: string;

  // AddrOne : SnkBoard - 1 : N 관계
  @OneToMany(() => SnkBoard, (snkBoards) => snkBoards.addrOne)
  @Field(() => [SnkBoard])
  snkBoards: SnkBoard[];
}
