import { Router } from "express";

import { mostrarCategorias } from "../controllers/categorias.controller.js";

export const api = Router();

api.get("/categorias", mostrarCategorias);