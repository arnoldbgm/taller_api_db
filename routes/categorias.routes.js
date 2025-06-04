import { Router } from "express";

import { mostrarCategorias, crearCategoria, eliminarCategoria, actualizarCategoria } from "../controllers/categorias.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const api = Router();

api.get("/categorias", mostrarCategorias);
api.post("/categorias", authMiddleware, crearCategoria); // ← protegido
api.delete("/categorias/:id", authMiddleware , eliminarCategoria);
api.put("/categorias/:id", authMiddleware, actualizarCategoria);