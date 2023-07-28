import { BaseDto } from '@app/dtos';
import { CompanyDto } from '@app/dtos/company/company.dto';
import { CompanyPageLink } from '@app/types/company/company-page-link';
import { CompanyPageSource } from '@app/types/company/company-page-source';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { FilterableField, Relation } from '@ptc-org/nestjs-query-graphql';
import { IsUrl, IsUUID } from 'class-validator';

registerEnumType(CompanyPageSource, { name: 'CompanyPageSource' });

@ObjectType('CompanyPageLink')
@Relation('company', () => CompanyDto)
export class CompanyPageLinkDto
  extends BaseDto
  implements Omit<CompanyPageLink, 'company'>
{
  @IsUrl()
  @Field()
  ref: string;

  @FilterableField(() => CompanyPageSource)
  source: CompanyPageSource;

  @IsUUID()
  @Field(() => ID)
  companyId: string;
}
