export interface ITaskForm {
  labelTitle: string;
  placeholderTitle: string;
  labelDescr: string;
  placeholderDesc: string;
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  status: boolean;
}
