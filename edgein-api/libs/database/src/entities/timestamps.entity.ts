import { Factory } from 'nestjs-seeder';
import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Maybe, Timestamps } from '@app/database/types';

/**
 * Base entity with timestamp fields
 */
export abstract class TimestampsEntity
  extends BaseEntity
  implements Timestamps
{
  /**
   * Create date column (in UTC)
   */
  @CreateDateColumn()
  @Factory((faker) => faker.date.past())
  createdAt: Date;

  /**
   * Update date column (in UTC)
   */
  @UpdateDateColumn()
  @Factory((faker) => faker.date.recent())
  updatedAt: Date;

  /**
   * Delete date column (in UTC)
   */
  @DeleteDateColumn()
  @Factory(null)
  deletedAt: Maybe<Date>;
}
