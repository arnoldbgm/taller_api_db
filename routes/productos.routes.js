import { Router } from "express";
import { mostrarProductos, agregarProducto, eliminarProducto } from "../controllers/productos.controller.js";

export const api = Router();

api.get("/productos", mostrarProductos);
api.post("/productos", agregarProducto);
api.delete("/productos/:id", eliminarProducto);