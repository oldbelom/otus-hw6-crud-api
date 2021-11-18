import { CRUD } from "./CRUD";

export class LocalStorage extends CRUD {
  createItem = async (itemName: string, itemValue: string) => {
    localStorage.setItem(itemName, itemValue);
  };

  readItem = async (itemName: string) => {
    if (localStorage.getItem(itemName) === null) {
      console.log("No matching item");
    }
    return localStorage.getItem(itemName) as string;
  };

  updateItem = async (itemName: string, newValue: string) => {
    localStorage.setItem(itemName, newValue);
  };

  deleteItem = async (itemName: string) => {
    localStorage.removeItem(itemName);
  };

  filterItem = async () => {
    const itemsArray: string[] = [];
    const localStorageKeys = Object.keys(localStorage);

    for (let i = 0; i < localStorageKeys.length; i++) {
      itemsArray.push(localStorage.getItem(localStorageKeys[i]) as string);
    }

    return itemsArray.sort();
  };
}
