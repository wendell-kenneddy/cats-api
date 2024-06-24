import { Router } from "express";
import { PersonsController } from "./controllers/PersonsController";
import { SQLitePersonsRepository } from "./repositories/SQLitePersonRepository";
import { dbPath } from "./db/dbPath";
import { CatsController } from "./controllers/CatsController";
import { SQLiteCatsRepository } from "./repositories/SQLiteCatsRepository";

const router = Router();
const personsController = new PersonsController(new SQLitePersonsRepository(dbPath));
const catsController = new CatsController(new SQLiteCatsRepository(dbPath));

router.post("/persons", (req, res) => personsController.createOne(req, res));
router.get("/persons/:id", (req, res) => personsController.getOne(req, res));
router.get("/persons", (req, res) => personsController.getAll(req, res));
router.delete("/persons/:id", (req, res) => personsController.deleteOne(req, res));
router.put("/persons/:id", (req, res) => personsController.updateOne(req, res));

router.post("/cats", (req, res) => catsController.createOne(req, res));
router.get("/cats/:id", (req, res) => catsController.getOne(req, res));
router.get("/cats", (req, res) => catsController.getAll(req, res));
router.delete("/cats/:id", (req, res) => catsController.deleteOne(req, res));
router.put("/cats/:id", (req, res) => catsController.updateOne(req, res));

export { router };
