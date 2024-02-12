import express from "express";
import cors from "cors";
import { router } from "../routes";

const PORT = process.env.PORT;

export const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
