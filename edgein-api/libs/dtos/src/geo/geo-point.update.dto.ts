import { GeoPointCreateDto } from '@app/dtos/geo/geo-point.create.dto';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType('GeoPointUpdate')
export class GeoPointUpdateDto extends PartialType(GeoPointCreateDto) {}
