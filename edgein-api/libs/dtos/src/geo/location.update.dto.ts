import { LocationCreateDto } from '@app/dtos/geo/location.create.dto';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType('LocationUpdate')
export class LocationUpdateDto extends PartialType(LocationCreateDto) {}
