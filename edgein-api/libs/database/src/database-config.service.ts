import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { BOOLEANS, EnvironmentVariables } from '@app/utils/config/environment';
import { TypeormLoggerService } from './typeorm-logger.service';

type Config = Pick<
  EnvironmentVariables,
  'POSTGRESQL_CONNECTION_STRING' | 'TYPEORM_SYNCHRONIZE' | 'TYPEORM_LOGGING'
>;

/**
 * Options to be passed to TypeOrmModuleOptions
 */
export type ModuleOptions = {
  /**
   * The connection name
   */
  name?: string;
};

/**
 * This is simple service that builds a TypeOrmModuleOptions.
 *
 * Options are filled with values from environment.
 */
@Injectable()
export class DatabaseConfigService {
  /**
   * Create a new DatabaseConfigService instance.
   * @param configService Injected config service with env setup
   * @param loggerService Injected logger service for TypeORM
   */
  constructor(
    private readonly configService: ConfigService<Config, true>,
    private readonly loggerService: TypeormLoggerService,
  ) {}

  /**
   * Check if env variable is set on True.
   * @param propertyPath Path of the property to check in the config
   * @private
   */
  private isSetOnTrue(propertyPath: keyof Config): boolean {
    return (
      BOOLEANS.TRUE ===
      this.configService.get<string>(propertyPath, BOOLEANS.FALSE)
    );
  }

  /**
   * Takes configuration from environment and returns a TypeOrmModuleOptions.
   *
   * @param options Options to be passed to TypeOrmModuleOptions.
   */
  build(options: ModuleOptions = { name: 'default' }): TypeOrmModuleOptions {
    return {
      useUTC: true,
      type: 'postgres',
      url: this.configService.getOrThrow('POSTGRESQL_CONNECTION_STRING', {
        infer: true,
      }),
      namingStrategy: new SnakeNamingStrategy(),
      autoLoadEntities: true,
      synchronize: this.isSetOnTrue('TYPEORM_SYNCHRONIZE'),
      logging: this.isSetOnTrue('TYPEORM_LOGGING'),
      logger: this.loggerService,
      ...options,
    };
  }
}
