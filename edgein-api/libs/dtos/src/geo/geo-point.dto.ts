import { GeoPoint } from '@app/types/geo/geoPoint';
import { Field, Float, ObjectType } from '@nestjs/graphql';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsString } from 'class-validator';

@ObjectType('GeoPoint')
export class GeoPointDto implements GeoPoint {
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @Field(() => [Float])
  coordinates: number[];

  @IsString()
  @Field()
  type: string;
}
