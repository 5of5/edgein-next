import { BaseEntity } from '@app/database';
import { CompanyEntity } from '@app/entities/company/company.entity';
import { SocialMediumSource, SocialMediumLink } from '@app/types/social-media';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  Relation,
} from 'typeorm';

@Entity('social_medium_links', { schema: 'roman' })
export class SocialMediumLinkEntity
  extends BaseEntity
  implements SocialMediumLink
{
  @Column({ type: 'text' })
  ref: string;

  @Column({ type: 'enum', enum: SocialMediumSource })
  @Index('idx_source')
  source: SocialMediumSource;

  @Column({ nullable: false })
  companyId: string;

  @ManyToOne(() => CompanyEntity, (company) => company.socialMediaLinks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: Relation<CompanyEntity>;
}
