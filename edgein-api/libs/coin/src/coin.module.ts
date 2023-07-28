import { Module } from '@nestjs/common';
import { CoinEntity } from '@app/entities/coin/coin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { CoinDto } from '@app/dtos/coin/coin.dto';
import { CoinCreateDto } from '@app/dtos/coin/coin.create.dto';
import { CoinUpdateDto } from '@app/dtos/coin/coin.update.dto';

const entities = [CoinEntity];

@Module({
  imports: [
    TypeOrmModule.forFeature(entities),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature(entities)],
      resolvers: [
        {
          EntityClass: CoinEntity,
          DTOClass: CoinDto,
          CreateDTOClass: CoinCreateDto,
          UpdateDTOClass: CoinUpdateDto,
          enableAggregate: true,
          enableTotalCount: true,
        },
      ],
    }),
  ],
})
export class CoinModule {}
