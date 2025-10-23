
export enum Language {
  AR = 'ar',
  EN = 'en'
}

export interface Task {
  id: string;
  text: string;
  isDone: boolean;
  deadline: string;
}