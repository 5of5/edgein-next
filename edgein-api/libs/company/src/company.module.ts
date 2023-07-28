import { AiCompanyCreateDto } from '@app/dtos/company/ai-company.create.dto';
import { AiCompanyDto } from '@app/dtos/company/ai-company.dto';
import { AiCompanyUpdateDto } from '@app/dtos/company/ai-company.update.dto';
import { CompanyPageLinkCreateDto } from '@app/dtos/company/company-page-link.create.dto';
import { CompanyPageLinkDto } from '@app/dtos/company/company-page-link.dto';
import { CompanyPageLinkUpdateDto } from '@app/dtos/company/company-page-link.update.dto';
import { CompanyCreateDto } from '@app/dtos/company/company.create.dto';
import { CompanyDto } from '@app/dtos/company/company.dto';
import { CompanyUpdateDto } from '@app/dtos/company/company.update.dto';
import { Web3CompanyCreateDto } from '@app/dtos/company/web3-company.create.dto';
import { Web3CompanyDto } from '@app/dtos/company/web3-company.dto';
import { Web3CompanyUpdateDto } from '@app/dtos/company/web3-company.update.dto';
import { AiCompanyDataEntity } from '@app/entities/company/ai-company-data.entity';
import { CompanyPageLinkEntity } from '@app/entities/company/company-page-link.entity';
import { CompanyEntity } from '@app/entities/company/company.entity';
import { Web3CompanyDataEntity } from '@app/entities/company/web3-company-data.entity';
import { SdkModule } from '@app/sdk';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';

import { WebhooksController } from './webhooks/webhooks.controller';

const entities = [
  CompanyEntity,
  CompanyPageLinkEntity,
  AiCompanyDataEntity,
  Web3CompanyDataEntity,
];

const services = [];

const resolvers = [];

@Module({
  exports: [...services],
  providers: [...services, ...resolvers],
  imports: [
    SdkModule,
    TypeOrmModule.forFeature(entities),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature(entities)],
      services,
      resolvers: [
        {
          EntityClass: CompanyEntity,
          DTOClass: CompanyDto,
          CreateDTOClass: CompanyCreateDto,
          UpdateDTOClass: CompanyUpdateDto,
          enableAggregate: true,
          enableTotalCount: true,
          delete: { useSoftDelete: true },
        },
        {
          EntityClass: CompanyPageLinkEntity,
          DTOClass: CompanyPageLinkDto,
          CreateDTOClass: CompanyPageLinkCreateDto,
          UpdateDTOClass: CompanyPageLinkUpdateDto,
          enableAggregate: true,
          enableTotalCount: true,
          delete: { useSoftDelete: true },
        },
        {
          EntityClass: AiCompanyDataEntity,
          DTOClass: AiCompanyDto,
          CreateDTOClass: AiCompanyCreateDto,
          UpdateDTOClass: AiCompanyUpdateDto,
          enableAggregate: true,
          enableTotalCount: true,
          delete: { useSoftDelete: true },
        },
        {
          EntityClass: Web3CompanyDataEntity,
          DTOClass: Web3CompanyDto,
          CreateDTOClass: Web3CompanyCreateDto,
          UpdateDTOClass: Web3CompanyUpdateDto,
          enableAggregate: true,
          enableTotalCount: true,
          delete: { useSoftDelete: true },
        },
      ],
    }),
  ],
  controllers: [WebhooksController],
})
export class CompanyModule {}
