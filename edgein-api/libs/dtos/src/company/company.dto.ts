import { Maybe } from '@app/database/types';
import { BaseDto } from '@app/dtos';
import { AiCompanyDto } from '@app/dtos/company/ai-company.dto';
import { CompanyPageLinkDto } from '@app/dtos/company/company-page-link.dto';
import { Web3CompanyDto } from '@app/dtos/company/web3-company.dto';
import { GeoPointDto } from '@app/dtos/geo/geo-point.dto';
import { LocationDto } from '@app/dtos/geo/location.dto';
import { SocialMediumLinkDto } from '@app/dtos/social-medium/social-medium-link.dto';
import { Company } from '@app/types/company';
import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableRelation,
  FilterableUnPagedRelation,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

@ObjectType('Company')
@Relation('web3Data', () => Web3CompanyDto, {
  nullable: true,
  update: { enabled: true },
  remove: { enabled: true },
})
@FilterableRelation('location', () => LocationDto, {
  nullable: true,
  update: { enabled: true },
  remove: { enabled: true },
})
@Relation('aiData', () => AiCompanyDto, {
  nullable: true,
  update: { enabled: true },
  remove: { enabled: true },
})
@FilterableUnPagedRelation('socialMediaLinks', () => SocialMediumLinkDto, {
  update: { enabled: true },
  remove: { enabled: true },
})
@FilterableUnPagedRelation('pages', () => CompanyPageLinkDto, {
  update: { enabled: true },
  remove: { enabled: true },
})
export class CompanyDto
  extends BaseDto
  implements
    Omit<
      Company,
      'aiData' | 'location' | 'web3Data' | 'socialMediaLinks' | 'pages'
    >
{
  @IsInt()
  @IsPositive()
  @FilterableField(() => Int)
  oldId: number;

  @IsDate()
  @Field(() => GraphQLISODateTime)
  dateAdded: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  marketVerified: Maybe<string>;

  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  notes: Maybe<string>;

  @IsString()
  @IsNotEmpty()
  @Field()
  overview: string;

  @IsNotEmpty()
  @FilterableField()
  slug: string;

  @Min(0)
  @Field(() => Int, { defaultValue: 0 })
  totalEmployees: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Field(() => Int, { nullable: true })
  totalValuation: Maybe<number>;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Field(() => Int, { nullable: true })
  investorAmount: Maybe<number>;

  @Field({ defaultValue: 0.0 })
  trajectory: number;

  @Min(1800)
  @Field(() => Int)
  yearFounded: number;

  @IsOptional()
  @ValidateNested()
  @Field(() => GeoPointDto, { nullable: true })
  @Type(() => GeoPointDto)
  geoPoint: Maybe<GeoPointDto>;
}
