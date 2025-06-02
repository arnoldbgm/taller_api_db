
# 🧩 ¿Cómo crear un controlador en Express?

## 🎯 ¿Qué es un controlador?

Un **controlador** es una función que se encarga de responder a una ruta. Es donde escribimos la **lógica de lo que queremos que pase** cuando alguien hace una petición a nuestra API.

👉 Por ejemplo: si alguien entra a `/categorias`, el controlador es el que busca las categorías en la base de datos y las devuelve.

---

## 🛠️ ¿Cómo se hace un controlador?

1. **Creamos un archivo en la carpeta `controllers/`**
   Ejemplo: `categorias.controller.js`

2. **Importamos la conexión de Prisma**

   ```js
   import { conexion } from "../utils/conexion.js";
   ```

3. **Creamos una función asíncrona que recibe `req` y `res`**

   ```js
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

---

## ✅ ¿Qué hace cada parte?

| Elemento                         | ¿Qué significa?                                               |
| -------------------------------- | ------------------------------------------------------------- |
| `conexion.categorias`            | Accede al modelo `categorias` definido por Prisma             |
| `.findMany()`                    | Busca todas las filas (equivale a `SELECT * FROM categorias`) |
| `.create({ data: { ... } })`     | Inserta un nuevo registro en la tabla                         |
| `.findUnique({ where: { id } })` | Busca una sola fila por su ID (clave primaria)                |
| `.update({ where, data })`       | Actualiza un registro                                         |
| `.delete({ where })`             | Elimina un registro                                           |

---

## 📊 Prisma vs SQL crudo

| Acción         | SQL tradicional                          | Prisma                                                 |
| -------------- | ---------------------------------------- | ------------------------------------------------------ |
| Obtener todo   | `SELECT * FROM categorias;`              | `conexion.categorias.findMany()`                       |
| Obtener por ID | `SELECT * FROM categorias WHERE id = 1;` | `conexion.categorias.findUnique({ where: { id: 1 } })` |
| Insertar       | `INSERT INTO categorias ...`             | `conexion.categorias.create({ data: { ... } })`        |
| Actualizar     | `UPDATE categorias SET ... WHERE id=1;`  | `conexion.categorias.update({ where, data })`          |
| Eliminar       | `DELETE FROM categorias WHERE id=1;`     | `conexion.categorias.delete({ where: { id: 1 } })`     |

✅ Con Prisma, no necesitas escribir SQL. Solo usas métodos claros como `.findMany()`, `.create()`, etc.

---

## 💡 Consejos prácticos

* Siempre usa `try...catch` para atrapar errores y evitar que el servidor se caiga.
* Valida los datos antes de insertar (`req.body`) para evitar errores en la base de datos.
* Prisma trabaja como una "traducción" de tus modelos en JS a instrucciones SQL.
* Prisma te permite escribir **menos código** y con **menos errores** que SQL directo.

---

## 📝 Ejemplo completo

```js
// categorias.controller.js
import { conexion } from "../utils/conexion.js";

export async function mostrarCategorias(req, res) {
  try {
    const categorias = await conexion.categorias.findMany();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron obtener las categorías" });
  }
}
```
