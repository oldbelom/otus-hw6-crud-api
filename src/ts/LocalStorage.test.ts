import { LocalStorage } from "./LocalStorage";

const calendar = new LocalStorage();

const testTask = {
  date: "05-12-2021",
  tag: "sport",
  status: "done",
  content: "go for a run",
};

describe("LocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("creare element in localStorage", async () => {
    await calendar.createItem(testTask, "task-1");
    expect(localStorage.length).toBe(1);
    await calendar.createItem(testTask, "task-2");
    expect(localStorage.length).toBe(2);
  });

  it("read element from localStorage", async () => {
    await calendar.createItem(testTask, "task-1");
    const item = await calendar.readItem("task-1");
    expect(item).toEqual(testTask);
  });

  it("print a message in console if there are no matching items when reading", async () => {
    const spy = jest.spyOn(console, "log");
    await calendar.readItem("test");
    expect(spy).toHaveBeenCalled();
  });

  it("update item", async () => {
    await calendar.createItem(testTask, "task-1");
    const item = await calendar.readItem("task-1");
    expect(item).toEqual(testTask);
    await calendar.updateItem(testTask, "tag", "work", "task-1");
    expect(testTask.tag).toBe("work");
  });

  it("delete item", async () => {
    localStorage.setItem("key", "value");
    await calendar.deleteItem("key");
    const item = localStorage.getItem("key");
    expect(item).toBe(null);
  });
});
