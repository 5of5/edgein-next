import { Maybe } from '@app/database/types';
import { CreateInputType } from '@app/dtos';
import { AiCompanyCreateDto } from '@app/dtos/company/ai-company.create.dto';
import { CompanyPageLinkCreateDto } from '@app/dtos/company/company-page-link.create.dto';
import { CompanyDto } from '@app/dtos/company/company.dto';
import { Web3CompanyCreateDto } from '@app/dtos/company/web3-company.create.dto';
import { GeoPointCreateDto } from '@app/dtos/geo/geo-point.create.dto';
import { LocationCreateDto } from '@app/dtos/geo/location.create.dto';
import { SocialMediumLinkCreateDto } from '@app/dtos/social-medium/social-medium-link.create.dto';
import { Field, InputType, OmitType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';

@InputType('CompanySocialMediumLinkInput')
export class CompanySocialMediumLinkInput extends OmitType(
  SocialMediumLinkCreateDto,
  ['companyId'] as const,
) {}

@InputType('CompanyPageLinkInput')
export class CompanyPageLinkInput extends OmitType(CompanyPageLinkCreateDto, [
  'companyId',
] as const) {}

@InputType('Web3CompanyDataInput')
export class Web3CompanyDataInput extends OmitType(Web3CompanyCreateDto, [
  'companyId',
] as const) {}

@InputType('AiCompanyDataInput')
export class AiCompanyDataInput extends OmitType(AiCompanyCreateDto, [
  'companyId',
] as const) {}

@InputType('CompanyCreate')
export class CompanyCreateDto extends CreateInputType(
  OmitType(CompanyDto, ['geoPoint'] as const),
) {
  @IsOptional()
  @ValidateNested()
  @Field(() => GeoPointCreateDto, { nullable: true })
  @Type(() => GeoPointCreateDto)
  geoPoint: Maybe<GeoPointCreateDto>;

  @IsOptional()
  @ValidateNested()
  @Field(() => LocationCreateDto, { nullable: true })
  @Type(() => LocationCreateDto)
  location: Maybe<LocationCreateDto>;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Field(() => [CompanySocialMediumLinkInput], { nullable: true })
  @Type(() => CompanySocialMediumLinkInput)
  socialMediaLinks: Maybe<CompanySocialMediumLinkInput[]>;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Field(() => [CompanyPageLinkInput], { nullable: true })
  @Type(() => CompanyPageLinkInput)
  pages: Maybe<CompanyPageLinkInput[]>;

  @IsOptional()
  @ValidateNested()
  @Field(() => Web3CompanyDataInput, { nullable: true })
  @Type(() => Web3CompanyDataInput)
  web3Data: Maybe<Web3CompanyDataInput>;

  @IsOptional()
  @ValidateNested()
  @Field(() => AiCompanyDataInput, { nullable: true })
  @Type(() => AiCompanyDataInput)
  aiData: Maybe<AiCompanyDataInput>;
}
