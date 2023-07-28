import { BaseDto } from '@app/dtos';
import { Web3CompanyDto } from '@app/dtos/company/web3-company.dto';
import {
  Web3SocialMediumLink,
  Web3SocialMediumSource,
} from '@app/types/social-media';
import { HasWeb3SocialMediumHostname } from '@app/utils/validators/has-web3-social-medium-hostname.validator';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { FilterableField, Relation } from '@ptc-org/nestjs-query-graphql';
import { IsUrl, IsUUID } from 'class-validator';

registerEnumType(Web3SocialMediumSource, { name: 'Web3SocialMediumSource' });

@ObjectType('Web3SocialMediumLink')
@Relation('web3Company', () => Web3CompanyDto)
export class Web3SocialMediumLinkDto
  extends BaseDto
  implements Omit<Web3SocialMediumLink, 'web3Company'>
{
  @IsUrl()
  @HasWeb3SocialMediumHostname({ message: 'Ref is not valid for source' })
  @Field()
  ref: string;

  @FilterableField(() => Web3SocialMediumSource)
  source: Web3SocialMediumSource;

  @IsUUID()
  @FilterableField(() => ID)
  web3CompanyId: string;
}
