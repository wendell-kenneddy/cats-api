import express from "express";
import dotenv from "dotenv";
import { router } from "./router";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
  console.log(`[server]: Server running on http://localhost:${port}`);
});
