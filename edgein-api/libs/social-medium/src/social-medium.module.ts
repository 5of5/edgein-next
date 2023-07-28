import { AiSocialMediumLinkCreateDto } from '@app/dtos/social-medium/ai-social-medium-link.create.dto';
import { AiSocialMediumLinkDto } from '@app/dtos/social-medium/ai-social-medium-link.dto';
import { AiSocialMediumLinkUpdateDto } from '@app/dtos/social-medium/ai-social-medium-link.update.dto';
import { SocialMediumLinkCreateDto } from '@app/dtos/social-medium/social-medium-link.create.dto';
import { SocialMediumLinkDto } from '@app/dtos/social-medium/social-medium-link.dto';
import { SocialMediumLinkUpdateDto } from '@app/dtos/social-medium/social-medium-link.update.dto';
import { Web3SocialMediumLinkCreateDto } from '@app/dtos/social-medium/web3-social-medium-link.create.dto';
import { Web3SocialMediumLinkDto } from '@app/dtos/social-medium/web3-social-medium-link.dto';
import { Web3SocialMediumLinkUpdateDto } from '@app/dtos/social-medium/web3-social-medium-link.update.dto';
import { AiSocialMediumLinkEntity } from '@app/entities/social-medium/ai-social-medium-link.entity';
import { SocialMediumLinkEntity } from '@app/entities/social-medium/social-medium-link.entity';
import { Web3SocialMediumLinkEntity } from '@app/entities/social-medium/web3-social-medium-link.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';

const entities = [
  SocialMediumLinkEntity,
  AiSocialMediumLinkEntity,
  Web3SocialMediumLinkEntity,
];

const services = [];

@Module({
  exports: [...services],
  providers: [...services],
  imports: [
    TypeOrmModule.forFeature(entities),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature(entities)],
      services,
      resolvers: [
        {
          EntityClass: SocialMediumLinkEntity,
          DTOClass: SocialMediumLinkDto,
          CreateDTOClass: SocialMediumLinkCreateDto,
          UpdateDTOClass: SocialMediumLinkUpdateDto,
          enableAggregate: true,
          enableTotalCount: true,
          delete: { useSoftDelete: true },
        },
        {
          EntityClass: AiSocialMediumLinkEntity,
          DTOClass: AiSocialMediumLinkDto,
          CreateDTOClass: AiSocialMediumLinkCreateDto,
          UpdateDTOClass: AiSocialMediumLinkUpdateDto,
          enableAggregate: true,
          enableTotalCount: true,
          delete: { useSoftDelete: true },
        },
        {
          EntityClass: Web3SocialMediumLinkEntity,
          DTOClass: Web3SocialMediumLinkDto,
          CreateDTOClass: Web3SocialMediumLinkCreateDto,
          UpdateDTOClass: Web3SocialMediumLinkUpdateDto,
          enableAggregate: true,
          enableTotalCount: true,
          delete: { useSoftDelete: true },
        },
      ],
    }),
  ],
})
export class SocialMediumModule {}
