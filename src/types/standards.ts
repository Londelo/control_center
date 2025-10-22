export interface StandardTask {
  text: string;
  completed: boolean;
}

export type Standard = {
  id: string;
  date: string;
  tasks: StandardTask[]
}

export type Standards = {
  [date: string]: Standard
}
