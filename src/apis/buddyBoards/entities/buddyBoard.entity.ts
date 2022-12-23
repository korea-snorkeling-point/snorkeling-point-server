import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class BuddyBoard {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ nullable: true })
  @Field(() => [String], { nullable: true })
  guestIds: string[];

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => String)
  meetDate: string;

  @Column()
  @Field(() => Int)
  members: number;

  @Column({ default: false })
  @Field(() => Boolean)
  isFull: boolean;
}
