import { plainToInstance } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNumber,
  IsString,
  Matches,
  Max,
  Min,
  validateSync,
} from 'class-validator';

/**
 * Regex represents a valid PostgreSQL URL
 */
const POSTGRESQL_URL_PATTERN =
  /^(postgres:\/{2})?(?:([^@/?#\s]+)@)?([^/?#\s]+)?(?:\/([^?#\s]*))?(?:[?]([^#\s]+))?\S*$/;

/**
 * String representation of booleans from ENV
 */
export enum BOOLEANS {
  TRUE = 'true',
  FALSE = 'false',
}

/**
 * Container for all environment variables with their default values and validations.
 *
 */
export class EnvironmentVariables {
  /**
   * API port. Default value: 4000
   */
  @IsNumber()
  @Min(1)
  @Max(65535)
  API_PORT = 4000;

  /// Database
  /**
   * PostgreSQL Connection String
   */
  @Matches(POSTGRESQL_URL_PATTERN, {
    message: 'Postgres URL is not valid',
  })
  @IsString()
  @IsDefined()
  POSTGRESQL_CONNECTION_STRING: string;

  /**
   * Use only on testing/local development for development purposes.
   * If set to true, then all changes on entities are synchronized into DB automatically.
   */
  @IsEnum(BOOLEANS)
  TYPEORM_SYNCHRONIZE: BOOLEANS = BOOLEANS.FALSE;

  /**
   * Use only on testing/local development for development purposes.
   * If set to true, then SQL logging into console is enabled.
   */
  @IsEnum(BOOLEANS)
  TYPEORM_LOGGING: BOOLEANS = BOOLEANS.FALSE;
}

/**
 * NestJS validation function for configuration.
 * @param config
 */
export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};
