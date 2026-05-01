/**
 * Data Transfer Objects (DTOs)
 * Simple, serializable objects used for passing data between layers
 * No methods, no behavior - just data shapes
 */

import type { DateString, EntityId, TimestampString } from './base';

// User DTO
export type UserDTO = {
  id: EntityId;
  username: string;
};

// Generic list response
export type ListResponseDTO<T> = {
  items: T[];
  total: number;
  offset?: number;
  limit?: number;
};

// Date navigation DTO
export type DateNavigationDTO = {
  currentDate: DateString;
  isToday: boolean;
};

// Placeholder DTOs for future features
// These will be expanded in later phases
export type PowerListTaskDTO = {
  id: EntityId;
  title: string;
  completed: boolean;
  position: number;
  createdAt: TimestampString;
};

export type TodoNodeDTO = {
  id: EntityId;
  title: string;
  parentId: EntityId | null;
  level: number;
  createdAt: TimestampString;
};

export type WinLossRecordDTO = {
  date: DateString;
  isWin: boolean;
  powerListCompleted: number;
  powerListTotal: number;
  standardsCompleted: number;
  standardsTotal: number;
};
