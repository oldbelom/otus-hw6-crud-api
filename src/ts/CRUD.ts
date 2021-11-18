export abstract class CRUD {
  abstract createItem(itemName: string, itemValue: string, path?: string): void;

  abstract readItem(itemName: string): void;

  abstract updateItem(itemName: string, newValue: string, path?: string): void;

  abstract deleteItem(itemName: string): void;

  abstract filterItem(path?: string): void;
}
