export interface Cat {
  id: string;
  name: string;
  breed: string;
  ownerId: string;
}

export abstract class CatsRepository {
  abstract createOne(cat: Cat): void;
  abstract getOne(id: string): Cat;
  abstract getAll(condition: string): Cat[];
  abstract deleteOne(id: string, ownerId: string): void;
  abstract updateOne(cat: Cat): void;
}
