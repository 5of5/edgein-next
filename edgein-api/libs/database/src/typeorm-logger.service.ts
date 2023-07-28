import { Injectable, Logger as NestLogger } from '@nestjs/common';
import { match } from 'ts-pattern';
import { Logger } from 'typeorm';

/**
 * Log TypeORM with NestJS Logger
 */
@Injectable()
export class TypeormLoggerService implements Logger {
  /**
   * NestJS logger instance
   * @private
   */
  private readonly logger: NestLogger = new NestLogger('TypeORM');

  /**
   * Stringify the parameters
   * @param parameters
   * @private
   */
  private stringifyParameters(parameters?: unknown[]) {
    try {
      return JSON.stringify(parameters);
    } catch {
      return '';
    }
  }

  /**
   * Log the message in requested level
   * @param level
   * @param message
   */
  log(level: 'log' | 'info' | 'warn', message: unknown): void {
    match(level)
      .with('log', () => this.logger.log(message))
      .with('info', () => this.logger.debug(message))
      .with('warn', () => this.logger.warn(message));
  }

  /**
   * Log migration message
   * @param message
   */
  logMigration(message: string): void {
    this.logger.log(message);
  }

  /**
   * Log query message
   * @param query
   * @param parameters
   */
  logQuery(query: string, parameters?: unknown[]) {
    this.logger.log(
      `${query} -- Parameters: ${this.stringifyParameters(parameters)}`
    );
  }

  /**
   * Log error message
   * @param error
   * @param query
   * @param parameters
   */
  logQueryError(
    error: string | Error,
    query: string,
    parameters?: unknown[]
  ): void {
    this.logger.error(
      `${query} -- Parameters: ${this.stringifyParameters(
        parameters
      )} -- ${JSON.stringify(error)}`
    );
  }

  /**
   * Log slow query with warn
   * @param time
   * @param query
   * @param parameters
   */
  logQuerySlow(time: number, query: string, parameters?: unknown[]): void {
    this.logger.warn(
      `Time: ${time} -- Parameters: ${this.stringifyParameters(
        parameters
      )} -- ${query}`
    );
  }

  /**
   * Log build schema message
   * @param message
   */
  logSchemaBuild(message: string): void {
    this.logger.log(message);
  }
}
