import { BaseDto } from '@app/dtos';
import { AiCompanyDto } from '@app/dtos/company/ai-company.dto';
import {
  AiSocialMediumLink,
  AiSocialMediumSource,
} from '@app/types/social-media';
import { HasAiSocialMediumHostname } from '@app/utils/validators/has-ai-social-medium-hostname.validator';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { FilterableField, Relation } from '@ptc-org/nestjs-query-graphql';
import { IsUrl, IsUUID } from 'class-validator';

registerEnumType(AiSocialMediumSource, { name: 'AiSocialMediumSource' });

@ObjectType('AiSocialMediumLink')
@Relation('aiCompany', () => AiCompanyDto)
export class AiSocialMediumLinkDto
  extends BaseDto
  implements Omit<AiSocialMediumLink, 'aiCompany'>
{
  @IsUrl()
  @HasAiSocialMediumHostname({ message: 'Ref is not valid for source' })
  @Field()
  ref: string;

  @FilterableField(() => AiSocialMediumSource)
  source: AiSocialMediumSource;

  @IsUUID()
  @FilterableField(() => ID)
  aiCompanyId: string;
}
