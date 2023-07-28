import { CreateInputType } from '@app/dtos';
import { LocationDto } from '@app/dtos/geo/location.dto';
import { InputType } from '@nestjs/graphql';

@InputType('LocationCreate')
export class LocationCreateDto extends CreateInputType(LocationDto) {}
