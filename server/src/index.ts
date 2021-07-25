import express, { Application, Request, Response } from "express";
import { urlencoded, json } from "body-parser";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

import apiV1 from "./routes/v1";

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const PORT: string = process.env.PORT!;
const app: Application = express();
app.use(urlencoded({ extended: false }));
app.use(json());

apiV1(app);

app.use((req: Request, res: Response) => {
  res.status(404).send("NOT FOUND");
});

});
