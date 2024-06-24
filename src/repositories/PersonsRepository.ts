export interface Person {
  id: string;
  name: string;
  age: number;
}

export abstract class PersonsRepository {
  abstract getAll(condition: string): Person[];
  abstract createOne(person: Person): void;
  abstract getOne(id: string): Person;
  abstract deleteOne(id: string): void;
  abstract updateOne(newData: Person): void;
}
