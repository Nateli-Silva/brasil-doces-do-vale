import express from "express";
import cors from "cors";
import { router } from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { env } from "./config/env";

export const app = express();

app.use(cors({ origin: env.corsOrigin }));
app.use(express.json());
app.use(router);

app.use(errorHandler);
