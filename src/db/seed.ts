import Database from "better-sqlite3";
import { Person } from "../repositories/PersonsRepository";
import { Cat } from "../repositories/CatsRepository";
import { faker } from "@faker-js/faker";
import { v4 } from "uuid";
import { dbPath } from "./dbPath";

const db = new Database(dbPath);
const persons: Person[] = [];
const cats: Cat[] = [];
const args = process.argv;

if (args[2] && args[2] == "crtables") {
  console.log("[seed]: creating persons table");
  db.prepare(
    `CREATE TABLE persons (
      id TEXET UNIQUE PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      age INTEGER NOT NULL
    )`
  ).run();

  console.log("[seed]: creating cats table");
  db.prepare(
    `CREATE TABLE cats (
      id TEXET UNIQUE PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      breed TEXT NOT NULL,
      owner_id TEXT NOT NULL,
      FOREIGN KEY (owner_id) REFERENCES persons(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE
    )`
  ).run();
}

const insertPerson = db.prepare("INSERT INTO persons (id, name, age) VALUES (@id, @name, @age)");
const insertCat = db.prepare(
  "INSERT INTO cats (id, name, breed, owner_id) VALUES (@id, @name, @breed, @ownerId)"
);

console.log("[seed]: creating persons");
for (let i = 0; i < 10; i++) {
  persons.push({
    id: v4(),
    name: faker.person.firstName(),
    age: faker.number.int({ min: 1, max: 69 }),
  });
}

console.log("[seed]: creating cats");
for (let i = 0; i < persons.length; i++) {
  for (let j = 0; j < 10; j++) {
    cats.push({
      id: v4(),
      name: faker.person.firstName(),
      breed: faker.animal.cat(),
      ownerId: persons[i].id,
    });
  }
}

console.log("[seed]: inserting into persons table");
for (const person of persons) insertPerson.run(person);

console.log("[seed]: inserting into cats table");
for (const cat of cats) insertCat.run(cat);

db.close();
console.log("[seed]: finished");
