import express from "express";
import cors from "cors";
import { API_VERSION } from "./constants.js";
import { api as categoriasRouter } from "./routes/categorias.routes.js";
import morgan from "morgan";


export const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
// Aqui van tus rutas
// app.use(`/api/${API_VERSION}`, );
app.use(`/api/${API_VERSION}`, categoriasRouter);