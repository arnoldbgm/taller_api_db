import { Router } from "express";
import { registrarUsuario, loginUsuario } from "../controllers/usuarios.controller.js";

export const api = Router();

api.post("/usuarios", registrarUsuario);
api.post("/usuarios/login", loginUsuario);