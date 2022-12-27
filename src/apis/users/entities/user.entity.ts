import { Field, ObjectType } from '@nestjs/graphql';
import { BuddyBoard } from 'src/apis/buddyBoards/entities/buddyBoard.entity';
import { BuddyParty } from 'src/apis/buddyParties/entities/buddyParty.entity';
import { Payment } from 'src/apis/payments/entities/payment.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  password: string;

  @Column()
  @Field(() => String)
  nickname: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Payment, (payments) => payments.user)
  @Field(() => [Payment])
  payments: Payment[];

  @OneToMany(() => BuddyParty, (buddyParties) => buddyParties.user)
  @Field(() => [BuddyParty])
  buddyParties: BuddyParty[];
}
