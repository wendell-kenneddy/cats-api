import { Request, Response } from "express";
import { number, object, ObjectSchema, string } from "yup";
import { Person, PersonsRepository } from "../repositories/PersonsRepository";
import { v4 } from "uuid";

const schema: ObjectSchema<Omit<Person, "id">> = object({
  name: string().required(),
  age: number().integer().required(),
});

export class PersonsController {
  constructor(private readonly personsRepository: PersonsRepository) {}

  createOne(req: Request, res: Response) {
    const person = req.body;
    schema.validate(person);
    const personWithId = { id: v4(), ...person };
    this.personsRepository.createOne(personWithId);
    res.status(200).json({ data: personWithId });
  }

  getAll(req: Request, res: Response) {
    const { pageSize, offset } = req.body;

    if (pageSize) {
      number().validateSync(pageSize);
    }

    if (offset) {
      number().validateSync(offset);
    }

    const condition = `LIMIT ${offset || 0}, ${pageSize || 5}`;
    const persons = this.personsRepository.getAll(condition);
    res.status(200).json({
      data: persons,
    });
  }

  getOne(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) throw new Error("Invalid ID.");
    const person = this.personsRepository.getOne(id);
    res.status(200).json({
      data: person,
    });
  }

  deleteOne(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) throw new Error("Invalid ID.");
    this.personsRepository.deleteOne(id);
    res.status(200).json({ message: "Record deleted successfully." });
  }

  updateOne(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) throw new Error("Invalid ID.");
    const newData = req.body;
    schema.validateSync(newData);
    this.personsRepository.updateOne({ id, ...newData });
    res.status(200).json({ message: "Record update successfully." });
  }
}
