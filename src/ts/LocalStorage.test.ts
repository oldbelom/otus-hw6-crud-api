import { LocalStorage } from "./LocalStorage";

const calendar = new LocalStorage();

describe("LocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("creare element in localStorage", async () => {
    await calendar.createItem("key", "value");
    expect(localStorage.length).toBe(1);
    await calendar.createItem("key-2", "value-2");
    expect(localStorage.length).toBe(2);
  });

  it("read element from localStorage", async () => {
    await calendar.createItem("key", "value");
    const item = await calendar.readItem("key");
    console.log(item);

    expect(item).toBe("value");
  });
  it("print a message in console if there are no matching items when reading", async () => {
    const spy = jest.spyOn(console, "log");
    await calendar.readItem("test");
    expect(spy).toHaveBeenCalled();
  });

  it("update item", async () => {
    localStorage.setItem("key", "value");
    let item = localStorage.getItem("key");
    expect(item).toBe("value");
    await calendar.updateItem("key", "new-value");
    item = localStorage.getItem("key");
    expect(item).toBe("new-value");
  });

  it("delete item", async () => {
    localStorage.setItem("key", "value");
    await calendar.deleteItem("key");
    const item = localStorage.getItem("key");
    expect(item).toBe(null);
  });

  it("filters items", async () => {
    localStorage.setItem("key-1", "ccc");
    localStorage.setItem("key-2", "bbb");
    localStorage.setItem("key-3", "aaa");
    const result = await calendar.filterItem();
    expect(result).toEqual(["aaa", "bbb", "ccc"]);
  });
});
