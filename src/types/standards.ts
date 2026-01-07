import { BaseTask, BaseTaskList } from './shared';

export interface StandardTask extends BaseTask {}

export interface Standard extends BaseTaskList<StandardTask> {}

export type Standards = {
  [date: string]: Standard
}
