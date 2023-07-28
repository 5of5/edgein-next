import { BaseEntity } from '@app/database';
import { Maybe } from '@app/database/types';
import { CoinEntity } from '@app/entities/coin/coin.entity';
import { CompanyEntity } from '@app/entities/company/company.entity';
import { Web3SocialMediumLinkEntity } from '@app/entities/social-medium/web3-social-medium-link.entity';
import {
  Web3CompanyData,
  Web3Layer,
  Web3Tags,
} from '@app/types/company/web3-company-data';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';

@Entity('web3_company_data', { schema: 'roman' })
export class Web3CompanyDataEntity
  extends BaseEntity
  implements Web3CompanyData
{
  @OneToMany(() => CoinEntity, (coin) => coin.web3Company, { cascade: true })
  coins: Relation<CoinEntity>[];

  @Column({
    type: 'simple-array',
    enum: Web3Tags,
    default: [],
  })
  tags: Web3Tags[];

  @Column({ type: 'enum', enum: Web3Layer, nullable: true })
  layer: Maybe<Web3Layer>;

  @Column({ nullable: false })
  companyId: string;

  @ManyToOne(() => CompanyEntity, (company) => company.web3Data, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: Relation<CompanyEntity>;

  @OneToMany(() => Web3SocialMediumLinkEntity, (link) => link.web3Company, {
    cascade: true,
  })
  socialMediaLinks: Relation<Web3SocialMediumLinkEntity>[];
}
