import { Person, PersonsRepository } from "./PersonsRepository";
import Database from "better-sqlite3";

export class SQLitePersonsRepository implements PersonsRepository {
  constructor(private readonly dbPath: string) {}

  createOne({ id, name, age }: Person): void {
    const db = new Database(this.dbPath);
    db.prepare(`INSERT INTO persons (id, name, age) VALUES ('${id}', '${name}', ${age});`).run();
    db.close();
  }

  getOne(id: string): Person {
    const db = new Database(this.dbPath);
    const statement = db.prepare(`SELECT * FROM persons WHERE id = '${id}'`);
    const person = statement.get() as Person;
    db.close();
    return person;
  }

  getAll(condition: string): Person[] {
    const db = new Database(this.dbPath);
    const statement = db.prepare(`SELECT * FROM persons ${condition}`);
    const persons: Person[] = statement.all() as Person[];

    db.close();
    return persons;
  }

  deleteOne(id: string): void {
    const db = new Database(this.dbPath);
    db.prepare(`DELETE FROM persons WHERE id = '${id}'`).run();
    db.close();
  }

  updateOne({ name, age, id }: Person): void {
    const db = new Database(this.dbPath);
    db.prepare(`UPDATE persons SET name = '${name}', age = '${age}' WHERE id = '${id}'`).run();
    db.close();
  }
}
