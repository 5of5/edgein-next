import { GeoPointDto } from '@app/dtos/geo/geo-point.dto';
import { InputType, OmitType } from '@nestjs/graphql';

@InputType('GeoPointCreat')
export class GeoPointCreateDto extends OmitType(GeoPointDto, [], InputType) {}
