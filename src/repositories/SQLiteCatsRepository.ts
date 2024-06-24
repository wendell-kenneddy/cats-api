import { v4 } from "uuid";
import { Cat, CatsRepository } from "./CatsRepository";
import Database from "better-sqlite3";

interface UnormalizedCat extends Omit<Cat, "ownerId"> {
  owner_id: string;
}

export class SQLiteCatsRepository implements CatsRepository {
  constructor(private readonly dbPath: string) {}

  createOne({ name, breed, ownerId }: Omit<Cat, "id">): void {
    const db = new Database(this.dbPath);
    db.prepare(
      `INSERT INTO cats (id, name, breed, owner_id) VALUES ('${v4()}', '${name}', '${breed}', '${ownerId}')`
    ).run();
    db.close();
  }

  getOne(id: string): Cat {
    const db = new Database(this.dbPath);
    const statement = db.prepare(`SELECT * FROM cats WHERE id = '${id}'`);
    const cat = statement.get() as UnormalizedCat;
    db.close();
    return { id: cat.id, name: cat.name, breed: cat.breed, ownerId: cat.owner_id };
  }

  getAll(condition: string): Cat[] {
    const db = new Database(this.dbPath);
    const statement = db.prepare(`SELECT * FROM cats ${condition}`);
    const cats = statement.all() as UnormalizedCat[];
    db.close();
    return cats.map(({ id, name, breed, owner_id }) => ({ id, name, breed, ownerId: owner_id }));
  }

  deleteOne(id: string, ownerId: string): void {
    const db = new Database(this.dbPath);
    db.prepare(`DELETE FROM cats WHERE id = '${id}' AND owner_id = '${ownerId}'`).run();
    db.close();
  }

  updateOne({ id, name, breed, ownerId }: Cat): void {
    const db = new Database(this.dbPath);
    db.prepare(
      `UPDATE cats SET name = '${name}', breed = '${breed}', owner_id = '${ownerId}' WHERE id = '${id}'`
    ).run();
    db.close();
  }
}
