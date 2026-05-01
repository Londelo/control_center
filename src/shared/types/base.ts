/**
 * Base type definitions shared across the application
 */

// User identity
export type User = {
  id: string;
  username: string;
};

// Date/Time types
export type DateString = string; // ISO 8601 format: YYYY-MM-DD
export type TimestampString = string; // ISO 8601 format: YYYY-MM-DDTHH:mm:ss.sssZ

// Common entity properties
export type EntityId = string;

export type BaseEntity = {
  id: EntityId;
  createdAt: TimestampString;
  updatedAt: TimestampString;
};

// Result type for operations that can fail
export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

// Optional helper
export type Maybe<T> = T | null | undefined;

// Readonly recursive helper
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
