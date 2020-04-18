require("dotenv").config();

import express from "express";

import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));

app.use(compression());
app.use(helmet());
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const appInit = async () => {
  console.log(`Example app listening on port ${port}!`);
};

app.listen(port, appInit);
