import { BaseEntity } from '@app/database';
import { Maybe } from '@app/database/types';
import { AiCompanyDataEntity } from '@app/entities/company/ai-company-data.entity';
import { CompanyPageLinkEntity } from '@app/entities/company/company-page-link.entity';
import { Web3CompanyDataEntity } from '@app/entities/company/web3-company-data.entity';
import { LocationEntity } from '@app/entities/geo/location.entity';
import { SocialMediumLinkEntity } from '@app/entities/social-medium/social-medium-link.entity';
import { Company } from '@app/types/company';
import { GeoPoint } from '@app/types/geo/geoPoint';
import { Factory } from 'nestjs-seeder';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  Relation,
} from 'typeorm';

@Entity('companies', { schema: 'roman' })
export class CompanyEntity extends BaseEntity implements Company {
  @Factory((faker) => faker.number.int({ min: 1, max: 1000000 }))
  @Column('int')
  @Index('idx_edgein_company_id', { unique: true })
  oldId: number;

  @Factory((faker) => faker.date.past())
  @Column('timestamptz')
  dateAdded: Date;

  @Factory((faker) => faker.string.alphanumeric(5))
  @Column('text', { nullable: true })
  marketVerified: Maybe<string>;

  @Factory((faker) => faker.company.name())
  @Column()
  name: string;

  @Factory((faker) => faker.lorem.sentence())
  @Column('text', { nullable: true })
  notes: Maybe<string>;

  @Factory((faker) => faker.lorem.sentence())
  @Column()
  overview: string;

  @Factory((faker) => faker.lorem.slug())
  @Column()
  @Index('idx_slug', { unique: true })
  slug: string;

  @Factory((faker) => faker.number.int({ min: 0, max: 100 }))
  @Column()
  totalEmployees: number;

  @Factory((faker) => faker.number.int({ min: 0, max: 1000000 }))
  @Column('bigint', { nullable: true })
  totalValuation: Maybe<number>;

  @Factory((faker) => faker.number.int({ min: 0, max: 1000000 }))
  @Column('bigint', { nullable: true })
  investorAmount: Maybe<number>;

  @Column('float')
  trajectory: number;

  @Factory((faker) => faker.number.int({ min: 2015, max: 2023 }))
  @Column('integer', { nullable: true })
  yearFounded: Maybe<number>;

  @Column({
    type: 'geography',
    srid: 4326,
    nullable: true,
  })
  geoPoint: Maybe<GeoPoint>;

  @Column('uuid', { nullable: true })
  locationId: Maybe<string>;

  // ------------------------ relations --------------------------
  // TODO set to remove on delete
  @OneToOne(() => LocationEntity, (loc) => loc.company, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'location_id' })
  location: Maybe<LocationEntity>;

  @OneToOne(() => AiCompanyDataEntity, (ai) => ai.company, {
    cascade: true,
  })
  aiData: Maybe<AiCompanyDataEntity>;

  @OneToOne(() => Web3CompanyDataEntity, (web3) => web3.company, {
    cascade: true,
  })
  web3Data: Maybe<Web3CompanyDataEntity>;

  @OneToMany(() => SocialMediumLinkEntity, (link) => link.company, {
    cascade: true,
  })
  socialMediaLinks: Relation<SocialMediumLinkEntity>[];

  @OneToMany(() => CompanyPageLinkEntity, (link) => link.company, {
    cascade: true,
  })
  pages: Relation<CompanyPageLinkEntity>[];
}
