import { BaseEntity } from '@app/database';
import { Maybe } from '@app/database/types';
import { CompanyEntity } from '@app/entities/company/company.entity';
import { Location } from '@app/types/geo/location';
import { Column, Entity, Index, OneToOne, Relation } from 'typeorm';

@Entity('locations', { schema: 'roman' })
export class LocationEntity extends BaseEntity implements Location {
  @Column({ type: 'text' })
  @Index()
  country: string;

  @Column({ type: 'text', nullable: true })
  state: Maybe<string>;

  @Column({ type: 'text', nullable: true })
  address: Maybe<string>;

  @Column({ type: 'text' })
  city: string;

  @OneToOne(() => CompanyEntity, (company) => company.location)
  company: Relation<CompanyEntity>;
}
