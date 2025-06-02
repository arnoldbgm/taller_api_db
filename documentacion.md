---
repository:
  name: api-prisma-node
  owner: unknown
  url: ""
generated:
  timestamp: 2025-06-02T03:31:15.535Z
  tool: FlatRepo
statistics:
  totalFiles: 11
  totalLines: 97
  languages:
    json: 1
    javascript: 8
  fileTypes:
    .json: 1
    .js: 8
    "": 1
    .prisma: 1
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
    "bcryptjs": "^3.0.2",
    "cors": "^2.8.5",
    "express": "^5.1.0",
    "morgan": "^1.10.0",
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
import morgan from "morgan";


export const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
// Aqui van tus rutas
// app.use(`/api/${API_VERSION}`, );
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

===  utils\conexion.js
```javascript
import { PrismaClient } from "@prisma/client";
export const conexion = new PrismaClient();
```
=== EOF: utils\conexion.js

===  prisma\schema.prisma
```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
=== EOF: prisma\schema.prisma

===  routes\categorias.routes.js
```javascript
import { Router } from "express";

import { mostrarCategorias } from "../controllers/categorias.controller.js";

export const api = Router();

api.get("/categorias", mostrarCategorias);
```
=== EOF: routes\categorias.routes.js

===  middlewares\middlewares.js
```javascript

```
=== EOF: middlewares\middlewares.js

===  controllers\categorias.controller.js
```javascript
import { conexion } from "../utils/conexion.js"

export async function mostrarCategorias(req, res) {
   try {
      const categorias = await conexion.categorias.findMany();
      res.json(categorias);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener categorías" });
   }
}
```
=== EOF: controllers\categorias.controller.js

