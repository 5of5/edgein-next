export type Maybe<T> = T | null | undefined;

/**
 * ID metadata
 */
export interface Identifiable {
  /**
   * Primary ID
   */
  id: string;
}

/**
 * Metadata about timestamps.
 */
export interface Timestamps {
  /**
   * Create date column (in UTC)
   */
  createdAt: Date;
  /**
   * Update date column (in UTC)
   */
  updatedAt: Date;

  /**
   * Update date column (in UTC)
   */
  deletedAt: Maybe<Date>;
}

export interface IBaseEntity extends Identifiable, Timestamps {}
