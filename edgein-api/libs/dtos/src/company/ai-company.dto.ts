import { BaseDto } from '@app/dtos';
import { CompanyDto } from '@app/dtos/company/company.dto';
import { AiSocialMediumLinkDto } from '@app/dtos/social-medium/ai-social-medium-link.dto';
import { AiCompanyData, AiTags } from '@app/types/company';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableUnPagedRelation,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { ArrayUnique, IsArray, IsEnum, IsUUID } from 'class-validator';

registerEnumType(AiTags, { name: 'AiTags' });

@ObjectType('AiCompany')
@Relation('company', () => CompanyDto)
@FilterableUnPagedRelation('socialMediaLinks', () => AiSocialMediumLinkDto, {
  update: { enabled: true },
  remove: { enabled: true },
})
export class AiCompanyDto
  extends BaseDto
  implements Omit<AiCompanyData, 'company' | 'socialMediaLinks'>
{
  @IsUUID()
  @FilterableField(() => ID)
  companyId: string;

  @IsArray()
  @ArrayUnique()
  @IsEnum(AiTags, { each: true })
  @Field(() => [AiTags])
  tags: AiTags[];
}
