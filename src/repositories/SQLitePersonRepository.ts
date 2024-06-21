import { Person, PersonsRepository } from "./PersonsRepository";
import { verbose } from "sqlite3";
const sqlite3 = verbose();

export class SQLitePersonsRepository implements PersonsRepository {
  constructor(private readonly dbPath: string) {}

  create({ id, name, age }: Person): void {
    const db = new sqlite3.Database(this.dbPath);
    db.run(`INSERT INTO persons (id, name, age) VALUES ("${id}", "${name}", ${age});`);
    db.close();
  }

  getOne(id: string, onFind: (person: Person) => void): void {
    const db = new sqlite3.Database(this.dbPath);

    db.get("SELECT * FROM persons WHERE id = ?", [id], (err, row) => {
      if (err) throw err;
      onFind(row as Person);
    });
    db.close();
  }

  getAll(onEntry: (persons: Person[]) => void): void {
    const db = new sqlite3.Database(this.dbPath);

    db.all("SELECT * FROM persons", (err, rows) => {
      if (err) throw err;
      onEntry(rows as Person[]);
    });

    db.close();
  }

  delete(id: string): void {}

  update(newData: Person): void {}
}
