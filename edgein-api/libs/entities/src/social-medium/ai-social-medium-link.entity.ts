import { BaseEntity } from '@app/database';
import { AiCompanyDataEntity } from '@app/entities/company/ai-company-data.entity';
import {
  AiSocialMediumSource,
  AiSocialMediumLink,
} from '@app/types/social-media';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  Relation,
} from 'typeorm';

@Entity('ai_social_medium_links', { schema: 'roman' })
export class AiSocialMediumLinkEntity
  extends BaseEntity
  implements AiSocialMediumLink
{
  @Column({ type: 'text' })
  ref: string;

  @Column({ type: 'enum', enum: AiSocialMediumSource })
  @Index()
  source: AiSocialMediumSource;

  @Column({ nullable: false })
  aiCompanyId: string;

  @ManyToOne(() => AiCompanyDataEntity, (company) => company.socialMediaLinks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ai_company_id' })
  aiCompany: Relation<AiCompanyDataEntity>;
}
