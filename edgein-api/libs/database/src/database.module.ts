import { Module } from '@nestjs/common';
import { DatabaseConfigService } from './database-config.service';
import { TypeormLoggerService } from './typeorm-logger.service';

@Module({
  providers: [DatabaseConfigService, TypeormLoggerService],
  exports: [DatabaseConfigService, TypeormLoggerService],
})
export class DatabaseModule {}
