import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { IDField } from '@ptc-org/nestjs-query-graphql';
import { Identifiable, Maybe, Timestamps } from '@app/database/types';

@ObjectType({ isAbstract: true })
export abstract class BaseDto implements Identifiable, Timestamps {
  @IDField(() => ID)
  id: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  deletedAt: Maybe<Date>;
}
