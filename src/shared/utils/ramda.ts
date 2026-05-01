/**
 * Ramda utility wrapper
 *
 * Re-exports all Ramda functions and adds pipeP for promise composition
 * Import everywhere as: import * as R from '@/shared/utils/ramda'
 */

export * from 'ramda';
import { pipeWith, andThen } from 'ramda';

// pipeP - Promise-aware pipe for async composition
export const pipeP = (...fns: Array<(...args: any[]) => any>) =>
  pipeWith(andThen)([...fns]);
