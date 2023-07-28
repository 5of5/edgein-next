import { Maybe } from '@app/database/types';
import { CreateInputType } from '@app/dtos';
import { Web3CompanyDto } from '@app/dtos/company/web3-company.dto';
import { Web3SocialMediumLinkCreateDto } from '@app/dtos/social-medium/web3-social-medium-link.create.dto';
import { Field, InputType, OmitType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';

@InputType('Web3CompanySocialMediumLinkInput')
export class Web3CompanySocialMediumLinkInput extends OmitType(
  Web3SocialMediumLinkCreateDto,
  ['web3CompanyId'] as const,
) {}

@InputType('Web3CompanyCreate')
export class Web3CompanyCreateDto extends CreateInputType(Web3CompanyDto) {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Field(() => [Web3CompanySocialMediumLinkInput], { nullable: true })
  @Type(() => Web3CompanySocialMediumLinkInput)
  socialMediaLinks: Maybe<Web3CompanySocialMediumLinkInput[]>;
}
