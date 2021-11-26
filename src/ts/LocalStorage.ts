import { CRUD, ITask } from "./CRUD";

export class LocalStorage extends CRUD {
  createItem = async (task: ITask, taskKey: string): Promise<void> => {
    await null;
    localStorage.setItem(taskKey, JSON.stringify(task));
  };

  readItem = async (taskKey: string): Promise<string> => {
    await null;
    if (localStorage.getItem(taskKey) === null) {
      console.log("No matching item");
    }
    return JSON.parse(localStorage.getItem(taskKey) as string);
  };

  updateItem = async (
    task: ITask,
    updatedFiekd: string,
    newValue: string,
    taskKey: string
  ): Promise<void> => {
    await null;
    const newTask = task;
    newTask[updatedFiekd] = newValue;
    localStorage.setItem(taskKey, JSON.stringify(newTask));
  };

  deleteItem = async (taskKey: string): Promise<void> => {
    await null;
    localStorage.removeItem(taskKey);
  };
}
