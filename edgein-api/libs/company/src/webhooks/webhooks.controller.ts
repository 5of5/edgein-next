import { Maybe } from '@app/database/types';
import {
  AiCompanyDataInput,
  CompanyPageLinkInput,
  CompanySocialMediumLinkInput,
  Web3CompanyDataInput,
} from '@app/dtos/company/company.create.dto';
import {
  CompanyData,
  Event,
  Library,
  SyncPayload,
} from '@app/dtos/company/sync-payload.swagger.dto';
import { Web3CompanySocialMediumLinkInput } from '@app/dtos/company/web3-company.create.dto';
import { OpName } from '@app/dtos/hasura/enums';
import { SdkService } from '@app/sdk';
import { AiTags, Web3Layer, Web3Tags } from '@app/types/company';
import {
  CompanyPageLinkMigrationAttribute,
  CompanyPageSource,
} from '@app/types/company/company-page-source';
import {
  SocialMediumMigrationAttribute,
  SocialMediumSource,
  Web3SocialMediumMigrationAttribute,
  Web3SocialMediumSource,
} from '@app/types/social-media';
import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { match } from 'ts-pattern';

function convertTags<T extends string>(
  tags: string[] | undefined,
  enumType: Record<T, string>,
): T[] {
  if (!tags) {
    return [];
  }
  const result: T[] = [];
  const invertDir: Record<string, T> = {};
  for (const key in enumType) {
    invertDir[enumType[key]] = key;
  }

  for (const tag of tags) {
    const e = invertDir[tag];
    if (e) {
      result.push(e);
    } else {
      console.warn(`Invalid enum value: ${tag}`);
    }
  }

  return result;
}

const parseSociaMediaLinks = (
  data: CompanyData,
): Array<CompanySocialMediumLinkInput> => {
  const result: Array<CompanySocialMediumLinkInput> = [];
  for (const source in SocialMediumMigrationAttribute) {
    const ref = data[SocialMediumMigrationAttribute[source]];
    if (ref) {
      result.push({ ref, source: source as SocialMediumSource });
    }
  }
  return result;
};

const parsePageLinks = (data: CompanyData): Array<CompanyPageLinkInput> => {
  const result: Array<CompanyPageLinkInput> = [];
  for (const source in CompanyPageLinkMigrationAttribute) {
    const ref = data[CompanyPageLinkMigrationAttribute[source]];
    if (ref) {
      result.push({ ref, source: source as CompanyPageSource });
    }
  }
  return result;
};

const parseWeb3CompanyData = (
  data: CompanyData,
): Maybe<Web3CompanyDataInput> => {
  const socialMediaLinks: Array<Web3CompanySocialMediumLinkInput> = [];
  const layer = data.layer
    ? (convertTags([data.layer], Web3Layer)[0] as Web3Layer)
    : undefined;
  const result = {
    tags: convertTags(data.tags, Web3Tags) as Web3Tags[],
    layer,
  };
  for (const source in Web3SocialMediumMigrationAttribute) {
    const ref = data[Web3SocialMediumMigrationAttribute[source]];
    if (ref) {
      socialMediaLinks.push({ ref, source: source as Web3SocialMediumSource });
    }
  }
  if (socialMediaLinks.length > 0) {
    return { ...result, socialMediaLinks };
  }
  if (data.library.includes(Library.Web3)) {
    return { ...result, socialMediaLinks: undefined };
  }
  return;
};

const parseAiCompanyData = (data: CompanyData): Maybe<AiCompanyDataInput> => {
  if (data.library.includes(Library.AI)) {
    return {
      socialMediaLinks: undefined,
      tags: convertTags(data.tags, AiTags) as AiTags[],
    };
  }
  return;
};

@ApiTags('edgein')
@Controller('companies')
export class WebhooksController {
  private readonly logger = new Logger(WebhooksController.name);

  constructor(private readonly sdkService: SdkService) {}

  private async insert(company: CompanyData) {
    const socialMediaLinks = parseSociaMediaLinks(company);
    const pages = parsePageLinks(company);
    const web3Data = parseWeb3CompanyData(company);
    const aiData = parseAiCompanyData(company);
    const input = {
      company: {
        oldId: company.id,
        name: company.name,
        dateAdded: company.date_added,
        notes: company.notes,
        overview: company.overview,
        slug: company.slug,
        totalEmployees: company.total_employees,
        marketVerified: company.market_verified,
        totalValuation: company.total_valuation,
        trajectory: company.trajectory,
        yearFounded: company.year_founded,
        geoPoint: company.geopoint,
        location: company.location_json,
        investorAmount: company.investor_amount,
        pages,
        socialMediaLinks,
        ...(web3Data ? { web3Data } : {}),
        ...(aiData ? { aiData } : {}),
      },
    };
    this.logger.debug(`insert: ${JSON.stringify(input)}`);
    return await this.sdkService.sdk.createOneCompany(input);
  }

  @Post('sync')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully synchronized.',
  })
  async sync(@Body() sync: SyncPayload) {
    this.logger.log(`sync: ${JSON.stringify(sync)}`);
    await match<Event>(sync.event)
      .with({ op: OpName.INSERT }, () => {
        const company = sync.event.data.new;
        return this.insert(company);
      })
      .with({ op: OpName.UPDATE }, () => {
        const company = sync.event.data.new;
        return this.insert(company);
        //throw new Error('Not implemented');
      })
      .with({ op: OpName.DELETE }, () => {
        throw new Error('Not implemented');
      })
      .with({ op: OpName.MANUAL }, () => {
        throw new Error('Not implemented');
      })
      .exhaustive();
  }
}
