import { Firebase } from "./Firebase";

const db = new Firebase();

const testTask = {
  date: "05-12-2021",
  tag: "sport",
  status: "done",
  content: "go for a run",
};

describe("Firebase", () => {
  it("create data", async () => {
    await db.createItem(testTask, "test/");
    expect(await db.readItem("test/")).toEqual(testTask);
  });

  it("update data", async () => {
    await db.updateItem(testTask, "tag", "work", "test-2/");
    const data = await db.readItem("test-2/");
    expect(data.tag).toBe("work");
  });

  it("read data and log error if data not exists", async () => {
    const spy = jest.spyOn(console, "log");
    await db.readItem("wrong-path/");
    expect(spy).toHaveBeenCalledWith("No data available");
  });

  it("delete data", async () => {
    const spy = jest.spyOn(console, "log");
    await db.createItem(testTask, "test-2/");
    await db.deleteItem("test-2/");
    await db.readItem("test-2/");
    expect(spy).toHaveBeenCalledWith("No data available");
  });
});
