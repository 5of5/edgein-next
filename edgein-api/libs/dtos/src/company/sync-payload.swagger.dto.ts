import { Maybe } from '@app/database/types';
import { OpName } from '@app/dtos/hasura/enums';
import { Web3Layer } from '@app/types/company';
import { IsLinkedinCompanyPath } from '@app/utils/validators/is-linkedin-company-path.validator';
import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsUrl,
  IsInt,
  ValidateNested,
  IsDate,
  IsArray,
  ArrayUnique,
  IsNumber,
  IsPositive,
  IsEnum,
  IsObject,
  IsOptional,
  ArrayMinSize,
  ArrayMaxSize,
  IsNotEmpty,
  Min,
} from 'class-validator';

const transformUrl = ({ value }) => {
  if (!value || value === '') return;
  const result = new URL(value);
  // Remove trailing slash
  if (result.pathname.endsWith('/')) {
    result.pathname = result.pathname.slice(0, -1);
  }

  // Remove query arguments
  result.search = '';

  // Remove www prefix (assuming www is at the beginning of the hostname)
  result.hostname = result.hostname.replace(/^www\./, '');

  return result.toString();
};

const transformEmptyString = ({ value }) => {
  if (!value || value === '') return;
  return value;
};

const transformNumber = ({ value }) => {
  if (!value || value === '') {
    return undefined;
  } else {
    return parseInt(value);
  }
};

export enum Library {
  Web3 = 'Web3',
  AI = 'AI',
}

export class Coordinates {
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber({}, { each: true })
  coordinates: [number, number];

  @IsString()
  type: string;
}

export class Logo {
  @IsString()
  @IsUrl()
  @Type(() => URL)
  url: URL;

  @IsInt()
  @IsPositive()
  id: number;
}

export class LocationJson {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(transformEmptyString)
  state: Maybe<string>;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(transformEmptyString)
  address: Maybe<string>;

  @IsString()
  @IsNotEmpty()
  city: string;
}

export class CompanyData {
  @IsOptional()
  @IsEnum(Web3Layer)
  layer: Maybe<Web3Layer>;

  @IsInt()
  @IsPositive()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  @Type(() => Date)
  date_added: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(transformEmptyString)
  notes: Maybe<string>;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocationJson)
  location_json: Maybe<LocationJson>;

  @IsString()
  @IsNotEmpty()
  overview: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(transformEmptyString)
  market_verified: Maybe<string>;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(transformNumber)
  total_valuation: Maybe<number>;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(transformNumber)
  investor_amount: Maybe<number>;

  @IsNumber()
  @Min(1800)
  @Transform(transformNumber)
  year_founded: number;

  @IsInt()
  @IsPositive()
  total_employees: number;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Logo)
  logo: Maybe<Logo>;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Coordinates)
  geopoint: Maybe<Coordinates>;

  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  tags: string[];

  @IsOptional()
  @IsString()
  @IsUrl({
    require_protocol: true,
    require_host: true,
    require_valid_protocol: true,
  })
  website: Maybe<string>;

  // Why? We can extract web_domain from website
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsUrl({
    require_protocol: false,
    require_host: true,
    allow_query_components: false,
  })
  @Transform(transformUrl)
  web_domain: Maybe<string>;

  // Why? It is same like web_domain.
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsUrl({
    require_protocol: false,
    require_host: true,
    allow_query_components: false,
  })
  @Transform(transformUrl)
  email_domain: Maybe<string>;

  @IsOptional()
  @IsString()
  @IsUrl({
    require_protocol: true,
    require_host: true,
    require_valid_protocol: true,
  })
  careers_page: Maybe<string>;

  @IsOptional()
  @IsString()
  @IsUrl()
  white_paper: Maybe<string>;

  @IsOptional()
  @IsString()
  @IsUrl()
  audit_file: Maybe<string>;

  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  @ArrayUnique()
  @IsEnum(Library, { each: true })
  library: Maybe<Library[]>;

  @IsInt()
  @Min(0)
  search_count: number;

  @IsNumber()
  trajectory: number;

  // social media

  @IsOptional()
  @IsString()
  @IsUrl({
    host_whitelist: ['etherscan.io', 'fio.bloks.io'],
    protocols: ['https'],
    require_protocol: true,
    require_host: true,
    require_valid_protocol: true,
    allow_query_components: false,
  })
  @Transform(transformUrl)
  blockchain_explorer: Maybe<string>;

  @IsOptional()
  @IsString()
  @IsUrl({
    host_whitelist: ['youtube.com', 'www.youtube.com'],
    protocols: ['https'],
    require_protocol: true,
    require_host: true,
    require_valid_protocol: true,
    allow_query_components: false,
  })
  @Transform(transformUrl)
  youtube: Maybe<string>;

  @IsOptional()
  @IsString()
  @IsUrl({
    host_whitelist: ['medium.com', 'www.medium.com'],
    protocols: ['https'],
    require_protocol: true,
    require_host: true,
    require_valid_protocol: true,
    allow_query_components: false,
  })
  @Transform(transformUrl)
  medium: Maybe<string>;

  @IsOptional()
  @IsString()
  @IsUrl({
    host_whitelist: ['www.reddit.com', 'reddit.com'],
    protocols: ['https'],
    require_protocol: true,
    require_host: true,
    require_valid_protocol: true,
    allow_query_components: false,
  })
  @Transform(transformUrl)
  reddit: Maybe<string>;

  @IsOptional()
  @IsString()
  @IsUrl({
    host_whitelist: ['t.me'],
    protocols: ['https'],
    require_protocol: true,
    require_host: true,
    require_valid_protocol: true,
    allow_query_components: false,
  })
  @Transform(transformUrl)
  telegram: Maybe<string>;

  @IsOptional()
  @IsString()
  @IsUrl({
    host_whitelist: ['www.instagram.com', 'instagram.com'],
    protocols: ['https'],
    require_protocol: true,
    require_host: true,
    require_valid_protocol: true,
    allow_query_components: false,
  })
  @Transform(transformUrl)
  instagram: Maybe<string>;

  @IsOptional()
  @IsString()
  @IsUrl({
    host_whitelist: ['bitcointalk.org'],
    protocols: ['https'],
    require_protocol: true,
    require_host: true,
    require_valid_protocol: true,
  })
  bitcointalk: Maybe<string>;

  @IsOptional()
  @IsString()
  @IsUrl({
    host_whitelist: ['glassdoor.com'],
    protocols: ['https'],
    require_protocol: true,
    require_host: true,
    require_valid_protocol: true,
    allow_query_components: false,
  })
  @Transform(transformUrl)
  glassdoor: Maybe<string>;

  @IsOptional()
  @IsString()
  @IsUrl({
    host_whitelist: ['twitter.com', 'www.twitter.com'],
    protocols: ['https'],
    require_protocol: true,
    require_host: true,
    require_valid_protocol: true,
  })
  @Transform(transformUrl)
  twitter: Maybe<string>;

  @IsOptional()
  @IsString()
  @IsUrl({
    host_whitelist: ['discord.com', 'discord.gg'],
    protocols: ['https'],
    require_protocol: true,
    require_host: true,
    require_valid_protocol: true,
    allow_query_components: false,
  })
  @Transform(transformUrl)
  discord: Maybe<string>;

  @IsOptional()
  @IsString()
  @IsUrl({
    host_whitelist: ['www.facebook.com', 'facebook.com'],
    protocols: ['https'],
    require_protocol: true,
    require_host: true,
    require_valid_protocol: true,
    allow_query_components: false,
  })
  @Transform(transformUrl)
  facebook: Maybe<string>;

  @IsOptional()
  @IsString()
  @IsUrl({
    host_whitelist: ['github.com'],
    protocols: ['https'],
    require_protocol: true,
    require_host: true,
    require_valid_protocol: true,
    allow_query_components: false,
  })
  @Transform(transformUrl)
  github: Maybe<string>;

  @IsOptional()
  @IsString()
  @IsUrl({
    host_whitelist: ['www.linkedin.com', 'linkedin.com'],
    protocols: ['https'],
    require_protocol: true,
    require_host: true,
    require_valid_protocol: true,
  })
  @IsLinkedinCompanyPath({ message: 'Not valid LinkedIn company URL' })
  @Transform(transformUrl)
  company_linkedin: Maybe<string>;
}

export class EventData {
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => CompanyData)
  old: Maybe<CompanyData>;

  @ValidateNested()
  @Type(() => CompanyData)
  new: CompanyData;
}

export class Event {
  @IsEnum(OpName)
  op: OpName;

  @IsObject()
  @ValidateNested()
  @Type(() => EventData)
  data: EventData;
}

export class SyncPayload {
  @IsDate()
  @Type(() => Date)
  created_at: Date;

  @IsString()
  id: string;

  @IsObject()
  @ValidateNested()
  @Type(() => Event)
  event: Event;
}
