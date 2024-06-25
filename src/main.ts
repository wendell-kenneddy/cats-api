import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import { router } from "./router";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const app = express();
const port = process.env.PORT || 3000;

app.use(helmet);
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server running on http://localhost:${port}`);
});
