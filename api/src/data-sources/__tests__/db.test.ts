import ParaCompDb from "../db";
import { InMemoryLRUCache } from "apollo-server-caching";


describe("testing db datasource", () => {
  const db = new ParaCompDb();
  db.initialize && db.initialize({ context: {}, cache: new InMemoryLRUCache() });

  it("Get paraglinders sorted by name and pageSize and pageNumber", async () => {
    const query = db.getParaglinders(5, 2, 'name').toQuery();
    expect(query).toEqual("select * from \"brand_model\" order by \"name\" asc limit 5 offset 5");
  });

  it("Get paraglinders sorted by CEN and pageSize and pageNumber", async () => {
    const query = db.getParaglinders(10, 1, 'CEN').toQuery();
    expect(query).toEqual("select * from \"brand_model\" order by \"CEN\" asc limit 10");
  });

  it("Update paraglinder", async () => {
    const query = db.updateParaglinder('Koyot', 'Niviuk', 'A', 5.2, 'hikeNfly', 9).toQuery();
    expect(query).toEqual("update \"brand_model\" set \"CEN\" = 'A', \"allon\" = 5.2, \"practice\" = 'hikeNfly', \"ratio\" = 9 where \"name\" = 'Koyot' and \"brand\" = 'Niviuk'");
  });
  it("Select paraglinder", async () => {
    const query = db.getParaglinder('Koyot', 'Niviuk').toQuery();
    expect(query).toEqual("select * from \"brand_model\" where \"name\" = 'Koyot' and \"brand\" = 'Niviuk' limit 1");
  });
  it("Select paraglinder", async () => {
    const query = db.deleteParaglinder('Koyot', 'Niviuk').toQuery();
    expect(query).toEqual("delete from \"brand_model\" where \"name\" = 'Koyot' and \"brand\" = 'Niviuk'");
  });
})