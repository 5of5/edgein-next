import { Factory } from 'nestjs-seeder';
import { BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
import { Identifiable } from '@app/database/types';

/**
 * Base entity with id field
 */
export abstract class IdentifiableEntity
  extends BaseEntity
  implements Identifiable
{
  /**
   * Primary ID
   */
  @PrimaryGeneratedColumn()
  @Factory((faker) => faker.string.uuid())
  id: string;
}
