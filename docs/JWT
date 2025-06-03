## 🧭 Guía: Cómo implementar autenticación con JWT en Express + Prisma

### ✅ Requisitos previos

Antes de comenzar, asegúrate de tener:

* Node.js y npm instalados
* Proyecto configurado con Express y Prisma
* Base de datos PostgreSQL lista
* Postman instalado para probar las rutas

---

### 1. 🧱 Preparar la base de datos

Agrega la tabla `usuarios` (si no la tienes):

```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  email VARCHAR(200) NOT NULL UNIQUE,
  password_hash VARCHAR(200) NOT NULL,
  fecha_registro TIMESTAMPTZ DEFAULT now()
);
```

Y en tu `schema.prisma`:

```prisma
model usuarios {
  id             Int       @id @default(autoincrement())
  nombre         String    @db.VarChar(150)
  email          String    @unique @db.VarChar(200)
  password_hash  String    @db.VarChar(200)
  fecha_registro DateTime? @default(now()) @db.Timestamptz(6)
}
```

Luego ejecuta:

```bash
npx prisma db pull
npx prisma generate
```

---

### 2. 🔐 Instalar dependencias necesarias

```bash
npm install jsonwebtoken bcryptjs dotenv
```

---

### 3. 🔑 Configurar variables de entorno

Crea o edita tu archivo `.env`:

```env
JWT_SECRET="clave_super_secreta"
```

---

### 4. ⚙️ Crear utilidades JWT

**`utils/jwt.js`**

```javascript
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRET;

export function generarToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

export function verificarToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
}
```

---

### 5. 🧰 Crear middleware de autenticación

**`middlewares/authMiddleware.js`**

```javascript
import { verificarToken } from "../utils/jwt.js";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: "Token no enviado" });

  const token = authHeader.split(" ")[1];
  const payload = verificarToken(token);

  if (!payload) return res.status(403).json({ error: "Token inválido o expirado" });

  req.usuario = payload;
  next();
}
```

---

### 6. 🧾 Crear controlador para login

**`controllers/usuarios.controller.js`**

```javascript
import { conexion } from "../utils/conexion.js";
import bcrypt from "bcryptjs";
import { generarToken } from "../utils/jwt.js";

export async function loginUsuario(req, res) {
  const { email, password } = req.body;

  const usuario = await conexion.usuarios.findUnique({ where: { email } });

  if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

  const passwordValido = await bcrypt.compare(password, usuario.password_hash);
  if (!passwordValido) return res.status(401).json({ error: "Contraseña incorrecta" });

  const token = generarToken({ id: usuario.id, email: usuario.email });
  res.json({ token });
}
```

---

### 7. 🛡️ Proteger rutas

```javascript
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { mostrarCategorias } from "../controllers/categorias.controller.js";

const router = Router();

router.get("/categorias", authMiddleware, mostrarCategorias);

export { router as categoriasRouter };
```

---

### 8. 🧪 Probar en Postman

1. Enviar POST a `/api/v1/login` con email y contraseña válidos.
2. Copiar el token recibido.
3. Usar ese token en otras rutas protegidas, agregando en Headers:

```
Authorization: Bearer TU_TOKEN
```

---

### 📌 Consejos para tus alumnos

* **bcryptjs** sirve para encriptar la contraseña antes de guardarla (usa `hash` y `compare`)
* **JWT** permite crear tokens firmados que incluyen información del usuario
* **Prisma** te permite usar métodos como `findUnique`, `create`, `update`, sin necesidad de escribir SQL crudo

  * `findUnique`: como `SELECT * FROM tabla WHERE campo = valor LIMIT 1`
  * `create`: como `INSERT INTO tabla (...) VALUES (...)`
  * `update`: como `UPDATE tabla SET ... WHERE ...`
  * `delete`: como `DELETE FROM tabla WHERE ...`

---

