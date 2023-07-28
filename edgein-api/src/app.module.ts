import { CoinModule } from '@app/coin';
import { CompanyModule } from '@app/company';
import { DatabaseConfigService, DatabaseModule } from '@app/database';
import { GeoModule } from '@app/geo';
import { SdkModule } from '@app/sdk';
import { SocialMediumModule } from '@app/social-medium';
import { validate } from '@app/utils/config';
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import metadata from './metadata';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      // You can also specify multiple paths for .env files.
      // If a variable is found in multiple files, the first one takes precedence.
      // @see https://docs.nestjs.com/techniques/configuration#custom-env-file-path
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
      validate,
    }),
    GraphQLModule.forRoot<YogaDriverConfig>({
      driver: YogaDriver,
      autoSchemaFile: './libs/sdk/schema.graphql',
      sortSchema: true,
      maskedErrors: false,
      metadata: metadata,
    }),
    TypeOrmModule.forRootAsync({
      imports: [DatabaseModule],
      extraProviders: [DatabaseConfigService],
      inject: [DatabaseConfigService],
      useFactory: (configBuilder: DatabaseConfigService) =>
        configBuilder.build(),
      dataSourceFactory: (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return Promise.resolve(
          addTransactionalDataSource(new DataSource(options)),
        );
      },
    }),
    CompanyModule,
    CoinModule,
    GeoModule,
    SdkModule,
    SocialMediumModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
