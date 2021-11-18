import { initializeApp } from "firebase/app";
import { getDatabase, set, get, ref, child, update } from "firebase/database";
import { CRUD } from "./CRUD";

interface IDatabaseItem {
  [key: string]: string | null;
}

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

  createItem = async (itemName: string, itemValue: string, path: string) => {
    const obj: IDatabaseItem = {};
    obj[itemName] = itemValue;
    set(ref(this.database, path), obj);
  };

  readItem = async (itemPath: string) => {
    const dbRef = ref(getDatabase());

    const data = get(child(dbRef, itemPath)).then((snapshot) => {
      if (!snapshot.exists()) {
        console.log("No data available");
      }
      return snapshot.val();
    });
    return data;
  };

  updateItem = async (itemName: string, newValue: string, path: string) => {
    const obj: IDatabaseItem = {};
    obj[itemName] = newValue;
    update(ref(this.database, path), obj);
  };

  deleteItem = async (itemName: string) => {
    const obj: IDatabaseItem = {};
    obj[itemName] = null;
    update(ref(this.database), obj);
  };

  filterItem = async (itemPath: string) => {
    const dbRef = ref(getDatabase());

    const data = get(child(dbRef, itemPath)).then((snapshot) => {
      if (!snapshot.exists()) {
        console.log("No data available");
      }
      return snapshot.val();
    });

    return Object.values(data).sort();
  };
}
