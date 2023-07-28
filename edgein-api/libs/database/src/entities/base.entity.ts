import { Factory } from 'nestjs-seeder';
import {
  BaseEntity as BE,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IBaseEntity, Maybe } from '@app/database/types';

/**
 * Base entity that all other models will extend
 */
export abstract class BaseEntity extends BE implements IBaseEntity {
  /**
   * Primary ID
   */
  @PrimaryGeneratedColumn('uuid')
  @Factory((faker) => faker.string.uuid())
  id: string;

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
