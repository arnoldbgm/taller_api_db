# 🛣️ ¿Qué es una ruta en Express?

Una **ruta** es una dirección o "camino" por donde los usuarios o aplicaciones pueden enviar peticiones (como `GET`, `POST`, etc.) a tu servidor.

👉 Ejemplo: si alguien accede a
`http://localhost:5000/api/v1/categorias`
la ruta es `/categorias`, y ahí se ejecuta una función (controlador) para responder.

---

## 🎯 ¿Para qué sirven las rutas?

Sirven para:

* **Recibir solicitudes** desde Postman o el navegador
* **Conectar la URL con un controlador**
* Definir **qué debe pasar** cuando alguien accede a cierta ruta

---

## 🛠️ ¿Cómo creo una ruta paso a paso?

### 1. Crea el archivo en la carpeta `routes/`

Por ejemplo:
`categorias.routes.js`

---

### 2. Importa Express y el controlador

```js
import { Router } from "express";
import { mostrarCategorias } from "../controllers/categorias.controller.js";
```

---

### 3. Crea una instancia de ruta

```js
const router = Router();
```

---

### 4. Define la ruta y conéctala al controlador

```js
router.get("/categorias", mostrarCategorias);
```

Esto significa:
➡️ Cuando alguien hace un **GET** a `/categorias`, se ejecuta `mostrarCategorias`.

---

### 5. Exporta la ruta para poder usarla

```js
export default router;
```

---

### 🧩 Resultado final del archivo `categorias.routes.js`

```js
import { Router } from "express";
import { mostrarCategorias } from "../controllers/categorias.controller.js";

const router = Router();

router.get("/categorias", mostrarCategorias);

export default router;
```

---

## ✅ ¿Cómo usar esa ruta en la aplicación?

Ve al archivo `app.js` y **monta la ruta** con una URL base, por ejemplo:

```js
import express from "express";
import cors from "cors";
import categoriasRoutes from "./routes/categorias.routes.js";
import { API_VERSION } from "./constants.js";

export const app = express();

app.use(express.json());
app.use(cors());

// Montamos la ruta base: http://localhost:5000/api/v1/categorias
app.use(`/api/${API_VERSION}`, categoriasRoutes);
```

---

## 💡 Consejos para usar rutas

| Buen hábito                          | ¿Por qué hacerlo?                               |
| ------------------------------------ | ----------------------------------------------- |
| ✅ Usa archivos separados por entidad | Ej. `usuarios.routes.js`, `productos.routes.js` |
| ✅ Usa verbos HTTP correctos          | `GET` para obtener, `POST` para crear, etc.     |
| ✅ No pongas lógica en la ruta        | Solo llama al controlador                       |
| ✅ Usa nombres claros en las rutas    | `/categorias`, `/productos`, etc.               |

---

## 📌 Comparación visual

| Parte de Express   | ¿Qué hace?                                     |
| ------------------ | ---------------------------------------------- |
| `Router()`         | Crea un grupo de rutas                         |
| `router.get(...)`  | Define una ruta tipo GET                       |
| `router.post(...)` | Define una ruta tipo POST                      |
| `app.use(...)`     | Le dice a Express que use esas rutas en la app |

---

## 🧪 ¿Cómo probarlo?

Una vez conectado todo:

1. Levanta el servidor con `npm run dev`
2. Abre **Postman**
3. Haz un GET a:

   ```
   http://localhost:5000/api/v1/categorias
   ```

