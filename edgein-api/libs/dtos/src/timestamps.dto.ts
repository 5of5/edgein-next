import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Maybe, Timestamps } from '@app/database/types';

@ObjectType({ isAbstract: true })
export abstract class TimestampsDto implements Timestamps {
  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  deletedAt: Maybe<Date>;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
