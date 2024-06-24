import { Request, Response } from "express";
import { number, object, ObjectSchema, string } from "yup";
import { v4 } from "uuid";
import { CatsRepository, Cat } from "../repositories/CatsRepository";

const schema: ObjectSchema<Omit<Cat, "id">> = object({
  name: string().required(),
  breed: string().required(),
  ownerId: string().required(),
});

export class CatsController {
  constructor(private readonly catsRepository: CatsRepository) {}

  createOne(req: Request, res: Response) {
    const cat = req.body;
    schema.validate(cat);
    const catWithId = { id: v4(), ...cat };
    this.catsRepository.createOne(catWithId);
    res.status(200).json({ data: catWithId });
  }

  getAll(req: Request, res: Response) {
    const { ownerId, pageSize, offset } = req.body;

    if (pageSize) {
      number().validateSync(pageSize);
    }

    if (offset) {
      number().validateSync(offset);
    }

    const pagination = `LIMIT ${offset || 0}, ${pageSize || 10}`;
    const cats = this.catsRepository.getAll(
      (ownerId ? `WHERE owner_id = '${ownerId}'` : "") + ` ${pagination}`
    );
    res.status(200).json({
      data: cats,
    });
  }

  getOne(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) throw new Error("Invalid ID.");
    const cat = this.catsRepository.getOne(id);
    res.status(200).json({
      data: cat,
    });
  }

  deleteOne(req: Request, res: Response) {
    const id = req.params.id;
    const ownerId = req.body.ownerId;
    if (!id || !ownerId) throw new Error("Insufficient params provided.");
    this.catsRepository.deleteOne(id, ownerId);
    res.status(200).json({ message: "Record deleted successfully." });
  }

  updateOne(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) throw new Error("Invalid ID.");
    const newData = req.body;
    schema.validateSync(newData);
    this.catsRepository.updateOne({ id, ...newData });
    res.status(200).json({ message: "Record update successfully." });
  }
}
