import { BaseEntity } from '@app/database';
import { CompanyEntity } from '@app/entities/company/company.entity';
import { AiSocialMediumLinkEntity } from '@app/entities/social-medium/ai-social-medium-link.entity';
import { AiCompanyData, AiTags } from '@app/types/company';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';

@Entity('ai_company_data', { schema: 'roman' })
export class AiCompanyDataEntity extends BaseEntity implements AiCompanyData {
  @Column({ nullable: false })
  companyId: string;

  @Column({
    type: 'simple-array',
    enum: AiTags,
    default: [],
  })
  tags: AiTags[];

  @ManyToOne(() => CompanyEntity, (company) => company.aiData, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: Relation<CompanyEntity>;

  @OneToMany(() => AiSocialMediumLinkEntity, (link) => link.aiCompany, {
    cascade: true,
  })
  socialMediaLinks: Relation<AiSocialMediumLinkEntity>[];
}
