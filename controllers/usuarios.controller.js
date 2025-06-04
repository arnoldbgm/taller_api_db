import { conexion } from "../utils/conexion.js";
import bcrypt from "bcryptjs";
import { generarToken } from "../utils/jwt.js";

export async function registrarUsuario(req, res) {
   try {
      const { nombre, email, password } = req.body;
      // Validaciones básicas
      if (!nombre || !email || !password) {
         return res.status(400).json({ error: "Todos los campos son obligatorios" });
      }
      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
         return res.status(400).json({ error: "Email no válido" });
      }
      // Validar longitud de password
      if (password.length < 6) {
         return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });
      }
      // Verificar si el email ya existe
      const existe = await conexion.usuarios.findUnique({ where: { email } });
      if (existe) {
         return res.status(409).json({ error: "El email ya está registrado" });
      }
      // Hashear la contraseña
      const password_hash = await bcrypt.hash(password, 10);
      // Crear usuario
      const usuario = await conexion.usuarios.create({
         data: { nombre, email, password_hash }
      });
      // No devolver el hash en la respuesta
      const { password_hash: _, ...usuarioSinPassword } = usuario;
      res.status(201).json(usuarioSinPassword);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al registrar usuario" });
   }
}

export async function loginUsuario(req, res) {
   try {
      const { email, password } = req.body;
      // Validaciones básicas
      if (!email || !password) {
         return res.status(400).json({ error: "Email y contraseña son obligatorios" });
      }
      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
         return res.status(400).json({ error: "Email no válido" });
      }
      // Buscar usuario por email
      const usuario = await conexion.usuarios.findUnique({ where: { email } });
      if (!usuario) {
         return res.status(401).json({ error: "Credenciales incorrectas" });
      }
      // Comparar contraseñas
      const passwordValida = await bcrypt.compare(password, usuario.password_hash);
      if (!passwordValida) {
         return res.status(401).json({ error: "Credenciales incorrectas" });
      }
      // Generar token JWT
      const { password_hash, ...usuarioSinPassword } = usuario;
      const token = generarToken({ id: usuario.id, email: usuario.email });
      res.json({ message: "Inicio de sesión exitoso", usuario: usuarioSinPassword, token });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al iniciar sesión" });
   }
}