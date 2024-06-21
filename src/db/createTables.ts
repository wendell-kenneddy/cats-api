import { verbose } from "sqlite3";
import { resolve } from "node:path";

const sqlite3 = verbose();
const path = resolve("./src/db/cats.db");
const db = new sqlite3.Database(path);

db.serialize(() => {
  db.run(`CREATE TABLE persons (
    id TEXT UNIQUE PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    age INTEGER NOT NULL);`).run(`CREATE TABLE cats (
       id TEXT UNIQUE PRIMARY KEY NOT NULL,
       name TEXT NOT NULL,
       breed TEXT NOT NULL,
      owner_id TEXT NOT NULL,
      FOREIGN KEY (owner_id) REFERENCES persons (id)
      ON UPDATE CASCADE
      ON DELETE CASCADE
  );`);
});

db.close();
