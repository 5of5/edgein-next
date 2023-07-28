import { LocationEntity } from '@app/entities/geo/location.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

const entities = [LocationEntity];

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
})
export class GeoModule {}
