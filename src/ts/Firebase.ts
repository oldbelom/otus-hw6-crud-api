import { initializeApp } from "firebase/app";
import { getDatabase, set, get, ref, child, update } from "firebase/database";
import { CRUD, ITask } from "./CRUD";

export class Firebase extends CRUD {
  private firebaseConfig = {
    apiKey: "AIzaSyCPh8s4qa_imCyczvEpeDGTRBod6ARsosY",
    authDomain: "otus-crud-api.firebaseapp.com",
    databaseURL:
      "https://otus-crud-api-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "otus-crud-api",
    storageBucket: "otus-crud-api.appspot.com",
    messagingSenderId: "854988389738",
    appId: "1:854988389738:web:f96fc8c381aa5a1e15b913",
  };

  private app = initializeApp(this.firebaseConfig);

  private database = getDatabase(this.app);

  createItem = async (task: ITask, path: string): Promise<void> => {
    set(ref(this.database, path), task);
  };

  readItem = async (itemPath: string): Promise<ITask> => {
    const dbRef = ref(getDatabase());

    const data = await get(child(dbRef, itemPath)).then((snapshot) => {
      if (!snapshot.exists()) {
        console.log("No data available");
      }
      return snapshot.val();
    });
    return data;
  };

  updateItem = async (
    task: ITask,
    taskKey: string,
    newValue: string,
    path: string
  ): Promise<void> => {
    const newTask = task;
    newTask[taskKey] = newValue;
    update(ref(this.database, path), newTask);
  };

  deleteItem = async (path: string): Promise<void> => {
    set(ref(this.database, path), null);
  };
}
