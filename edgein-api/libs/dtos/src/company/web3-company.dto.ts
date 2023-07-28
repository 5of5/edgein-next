import { Maybe } from '@app/database/types';
import { BaseDto } from '@app/dtos';
import { CoinDto } from '@app/dtos/coin/coin.dto';
import { CompanyDto } from '@app/dtos/company/company.dto';
import { Web3SocialMediumLinkDto } from '@app/dtos/social-medium/web3-social-medium-link.dto';
import { Web3CompanyData, Web3Layer, Web3Tags } from '@app/types/company';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableUnPagedRelation,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsOptional,
  IsUUID,
} from 'class-validator';

registerEnumType(Web3Tags, { name: 'Web3Tags' });
registerEnumType(Web3Layer, { name: 'Web3Layer' });

@ObjectType('Web3Company')
@Relation('company', () => CompanyDto)
@FilterableUnPagedRelation('coins', () => CoinDto, {
  update: { enabled: true },
  remove: { enabled: true },
})
@FilterableUnPagedRelation('socialMediaLinks', () => Web3SocialMediumLinkDto, {
  update: { enabled: true },
  remove: { enabled: true },
})
export class Web3CompanyDto
  extends BaseDto
  implements Omit<Web3CompanyData, 'coins' | 'company' | 'socialMediaLinks'>
{
  @IsUUID()
  @FilterableField(() => ID)
  companyId: string;

  @IsArray()
  @ArrayUnique()
  @IsEnum(Web3Tags, { each: true })
  @Field(() => [Web3Tags])
  tags: Web3Tags[];

  @IsOptional()
  @IsEnum(Web3Layer)
  @Field(() => Web3Layer, { nullable: true })
  layer: Maybe<Web3Layer>;
}
