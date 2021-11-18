import { off } from "firebase/database";
import { Firebase } from "./Firebase";

const db = new Firebase();

describe("Firebase", () => {
  it("create data", async () => {
    await db.createItem("one", "two", "test/");
    expect(await db.readItem("test/")).toEqual({ one: "two" });
  });
  it("update data", async () => {
    await db.updateItem("one", "two-two", "test/");
    expect(await db.readItem("test/")).toEqual({ one: "two-two" });
  });
  it("read data and log error if data not exists", async () => {
    const spy = jest.spyOn(console, "log");
    await db.readItem("wrong-path/");
    expect(spy).toHaveBeenCalledWith("No data available");
  });
  it("delete data", async () => {
    const spy = jest.spyOn(console, "log");
    await db.createItem("one", "two", "test/");
    await db.deleteItem("one");
    await db.readItem("wrong-path/");
    expect(spy).toHaveBeenCalledWith("No data available");
  });
  it("filter data", async () => {
    await db.createItem("one", "two", "test/");
    expect(await db.filterItem("test/")).toBeInstanceOf(Array);
  });
});
