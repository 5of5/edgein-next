import { BaseEntity } from '@app/database';
import { CompanyEntity } from '@app/entities/company/company.entity';
import { CompanyPageLink } from '@app/types/company/company-page-link';
import { CompanyPageSource } from '@app/types/company/company-page-source';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  Relation,
} from 'typeorm';

@Entity('companies_pages_links', { schema: 'roman' })
export class CompanyPageLinkEntity
  extends BaseEntity
  implements CompanyPageLink
{
  @Column({ type: 'text' })
  ref: string;

  @Column({ type: 'enum', enum: CompanyPageSource })
  @Index()
  source: CompanyPageSource;

  @Column({ nullable: false })
  companyId: string;

  @ManyToOne(() => CompanyEntity, (company) => company.pages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: Relation<CompanyEntity>;
}
