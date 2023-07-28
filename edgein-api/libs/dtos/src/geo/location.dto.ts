import { Maybe } from '@app/database/types';
import { BaseDto } from '@app/dtos';
import { Location } from '@app/types/geo/location';
import { Field, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@ObjectType('Location')
export class LocationDto extends BaseDto implements Location {
  @IsNotEmpty()
  @FilterableField()
  country: string;

  @IsOptional()
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  state: Maybe<string>;

  @IsNotEmpty()
  @Field()
  city: string;

  @IsOptional()
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  address: Maybe<string>;
}
