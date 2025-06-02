---
repository:
  name: api-prisma-node
  owner: unknown
  url: ""
generated:
  timestamp: 2025-06-02T02:17:42.745Z
  tool: FlatRepo
statistics:
  totalFiles: 6
  totalLines: 77
  languages:
    json: 1
    javascript: 3
  fileTypes:
    .json: 1
    .js: 3
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


export const app = express();

app.use(express.json());
app.use(cors());

// Aqui van tus rutas
// app.use(`/api/${API_VERSION}`, );
```
=== EOF: app.js

===  .env copy
```
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```
=== EOF: .env copy

===  prisma\schema.prisma
```
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
=== EOF: prisma\schema.prisma

