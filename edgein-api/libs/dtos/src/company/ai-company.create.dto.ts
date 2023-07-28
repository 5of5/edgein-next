import { Maybe } from '@app/database/types';
import { CreateInputType } from '@app/dtos';
import { AiCompanyDto } from '@app/dtos/company/ai-company.dto';
import { AiSocialMediumLinkCreateDto } from '@app/dtos/social-medium/ai-social-medium-link.create.dto';
import { Field, InputType, OmitType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';

@InputType('AiCompanySocialMediumLinkInput')
export class AiCompanySocialMediumLinkInput extends OmitType(
  AiSocialMediumLinkCreateDto,
  ['aiCompanyId'] as const,
) {}

@InputType('AiCompanyCreate')
export class AiCompanyCreateDto extends CreateInputType(AiCompanyDto) {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Field(() => [AiCompanySocialMediumLinkInput], { nullable: true })
  @Type(() => AiCompanySocialMediumLinkInput)
  socialMediaLinks: Maybe<AiCompanySocialMediumLinkInput[]>;
}
