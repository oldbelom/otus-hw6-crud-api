export interface ITask {
  date: string;
  tag: string;
  status: string;
  content: string;
  [key: string]: string;
}

export abstract class CRUD {
  abstract createItem(task: ITask, path?: string): Promise<void>;

  abstract readItem(itemName: string): Promise<string> | Promise<ITask>;

  abstract updateItem(
    task: ITask,
    taskKey: string,
    newValue: string,
    path?: string
  ): Promise<void>;

  abstract deleteItem(path: string): Promise<void>;
}
