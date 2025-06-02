---
repository:
  name: api-prisma-node
  owner: unknown
  url: ""
generated:
  timestamp: 2025-06-02T03:04:39.160Z
  tool: FlatRepo
statistics:
  totalFiles: 33
  totalLines: 95471
  languages:
    json: 2
    javascript: 19
    typescript: 7
  fileTypes:
    .json: 2
    .js: 19
    "": 1
    .prisma: 2
    .sql: 1
    .ts: 7
    .node: 1
---

===  package.json
```json
{
  "name": "api-prisma-node",
  "version": "1.0.0",
  "main": "main.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node main.js",
    "dev": "nodemon main.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "@prisma/client": "^6.8.2",
    "cors": "^2.8.5",
    "express": "^5.1.0",
    "nodemon": "^3.1.10"
  },
  "devDependencies": {
    "prisma": "^6.8.2"
  }
}
```
=== EOF: package.json

===  main.js
```javascript
import { app } from "./app.js";
import { IP_SERVER, API_VERSION } from "./constants.js";

const PORT = 5000;

try {
  app.listen(PORT, () => {
    console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
    console.log(`Backend Starts ${PORT}✅💪🟢`);
  });
} catch (err) {
  console.error(err);
}
```
=== EOF: main.js

===  constants.js
```javascript
export const API_VERSION = "v1";
export const IP_SERVER = "localhost";

// export const JWT_SECRET_KEY = "JWTkeyPass"
```
=== EOF: constants.js

===  app.js
```javascript
import express from "express";
import cors from "cors";
import { API_VERSION } from "./constants.js";
import { api as categoriasRouter } from "./routes/categorias.routes.js";


export const app = express();

app.use(express.json());
app.use(cors());

// Aqui van tus rutas
app.use(`/api/${API_VERSION}`, categoriasRouter);
```
=== EOF: app.js

===  .env copy
```
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgresql://postgres:root@localhost:5432/taller_db?schema=public"
```
=== EOF: .env copy

===  utils\utils.js
```javascript

```
=== EOF: utils\utils.js

===  routes\categorias.routes.js
```javascript
import { Router } from "express";

import { mostrarCategorias } from "../controllers/categorias.controller.js";

export const api = Router();

api.post("/categorias", mostrarCategorias);
```
=== EOF: routes\categorias.routes.js

===  prisma\schema.prisma
```
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model categorias {
  id          Int         @id @default(autoincrement())
  nombre      String      @unique @db.VarChar(100)
  descripcion String?
  productos   productos[]
}

/// This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
model productos {
  id           Int        @id @default(autoincrement())
  nombre       String     @db.VarChar(150)
  descripcion  String?
  precio       Decimal    @db.Decimal(10, 2)
  categoria_id Int
  categorias   categorias @relation(fields: [categoria_id], references: [id], map: "fk_producto_categoria")
}

model usuarios {
  id             Int       @id @default(autoincrement())
  nombre         String    @db.VarChar(150)
  email          String    @unique @db.VarChar(200)
  password_hash  String    @db.VarChar(200)
  fecha_registro DateTime? @default(now()) @db.Timestamptz(6)
}
```
=== EOF: prisma\schema.prisma

===  middlewares\middlewares.js
```javascript

```
=== EOF: middlewares\middlewares.js

===  documents\db.sql
```
-- 1. Tabla de usuarios
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  email VARCHAR(200) NOT NULL UNIQUE,
  password_hash VARCHAR(200) NOT NULL,
  fecha_registro TIMESTAMPTZ DEFAULT now()
);

-- 2. Tabla de categorías
CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  descripcion TEXT
);

-- 3. Tabla de productos
CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  descripcion TEXT,
  precio NUMERIC(10,2) NOT NULL,
  categoria_id INTEGER NOT NULL,
  CONSTRAINT fk_producto_categoria
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
    ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Insertar categorías
INSERT INTO categorias (nombre, descripcion) VALUES
  ('Tecnología', 'Productos electrónicos como laptops y smartphones'),
  ('Hogar', 'Artículos para el hogar y oficina');

-- Insertar productos
INSERT INTO productos (nombre, descripcion, precio, categoria_id) VALUES
  ('Laptop Pro', 'Laptop con 16GB RAM y SSD de 512GB', 2200.00, 1),
  ('Silla Ergonómica', 'Silla de oficina con soporte lumbar', 350.00, 2);

-- Insertar usuario
INSERT INTO usuarios (nombre, email, password_hash) VALUES
  ('Jhancarlo Esteban', 'jhancarlo@example.com', 'HASH123');
```
=== EOF: documents\db.sql

===  controllers\categorias.controller.js
```javascript
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function mostrarCategorias() {
   try {
      const categorias = await prisma.categorias.findMany({
         include: { productos: true },
      });
      res.json(categorias);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener categorías" });
   }
}
```
=== EOF: controllers\categorias.controller.js
