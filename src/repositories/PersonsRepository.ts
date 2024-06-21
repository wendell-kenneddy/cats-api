export interface Person {
  id: string;
  name: string;
  age: number;
}

export abstract class PersonsRepository {
  abstract getAll(onEntry: (persons: Person[]) => void): void;
  abstract create(person: Person): void;
  abstract getOne(id: string, onFind: (person: Person) => void): void;
  abstract delete(id: string): void;
  abstract update(newData: Person): void;
}
