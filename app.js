import express from "express";
import cors from "cors";
import { API_VERSION } from "./constants.js";


export const app = express();

app.use(express.json());
app.use(cors());

// Aqui van tus rutas
// app.use(`/api/${API_VERSION}`, );
