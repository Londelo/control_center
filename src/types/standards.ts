export interface StandardTask {
  id: string;
  date: string;
  text: string;
  completed: boolean;
}

export type Standards = {
  [date: string]: StandardTask[]
}
