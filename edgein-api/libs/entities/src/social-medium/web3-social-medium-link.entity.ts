import { BaseEntity } from '@app/database';
import { Web3CompanyDataEntity } from '@app/entities/company/web3-company-data.entity';
import {
  Web3SocialMediumLink,
  Web3SocialMediumSource,
} from '@app/types/social-media';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  Relation,
} from 'typeorm';

@Entity('web3_social_medium_links', { schema: 'roman' })
export class Web3SocialMediumLinkEntity
  extends BaseEntity
  implements Web3SocialMediumLink
{
  @Column({ type: 'text' })
  ref: string;

  @Column({ type: 'enum', enum: Web3SocialMediumSource })
  @Index()
  source: Web3SocialMediumSource;

  @Column({ nullable: false })
  web3CompanyId: string;

  @ManyToOne(
    () => Web3CompanyDataEntity,
    (company) => company.socialMediaLinks,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'web3_company_id' })
  web3Company: Relation<Web3CompanyDataEntity>;
}
