import { BaseDto } from '@app/dtos';
import { CompanyDto } from '@app/dtos/company/company.dto';
import { SocialMediumLink, SocialMediumSource } from '@app/types/social-media';
import { HasSocialMediumHostname } from '@app/utils/validators/has-social-medium-hostname.validator';
import { HasSocialMediumPathPrefix } from '@app/utils/validators/has-social-medium-path-prefix.validator';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { FilterableField, Relation } from '@ptc-org/nestjs-query-graphql';
import { IsUrl, IsUUID } from 'class-validator';

registerEnumType(SocialMediumSource, { name: 'SocialMediumSource' });

@ObjectType('SocialMediumLink')
@Relation('company', () => CompanyDto)
export class SocialMediumLinkDto
  extends BaseDto
  implements Omit<SocialMediumLink, 'company'>
{
  @IsUrl()
  @HasSocialMediumHostname()
  @HasSocialMediumPathPrefix()
  @Field()
  ref: string;

  @FilterableField(() => SocialMediumSource)
  source: SocialMediumSource;

  @IsUUID()
  @Field(() => ID)
  companyId: string;
}
