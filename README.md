# 📦 API REST con Node.js, Express y Prisma

<img src="https://user-images.githubusercontent.com/13700/35731649-652807e8-080e-11e8-88fd-1b2f6d553b2d.png" height=90>

Bienvenido al proyecto base para construir una API utilizando **Express.js** y **Prisma ORM** conectado a una base de datos PostgreSQL. Este proyecto está pensado para aprender desde cero cómo conectar un backend con una base de datos real, de forma modular y limpia.

---

## 📋 Requisitos previos

Antes de empezar, asegúrate de tener lo siguiente instalado en tu computadora:

**Herramientas necesarias:**

* **Node.js** – Para ejecutar el servidor backend con JavaScript
  Descarga: [https://nodejs.org/](https://nodejs.org/)

* **PostgreSQL** – La base de datos que usaremos para almacenar la información
  Descarga: [https://www.postgresql.org/](https://www.postgresql.org/)

* **Postman** – Aplicación para probar nuestras rutas HTTP y ver las respuestas del servidor
  Descarga: [https://www.postman.com/downloads/](https://www.postman.com/downloads/)

---

## 🧠 ¿Qué es Express.js y por qué lo usamos?

Express.js es un framework minimalista para construir servidores web y APIs usando Node.js. Lo utilizamos porque:

* Es fácil de aprender
* Permite definir rutas con distintos métodos HTTP (GET, POST, PUT, DELETE, etc.)
* Se puede conectar con cualquier base de datos y ORM (como Prisma)
* Nos permite modularizar nuestro backend

---

## 📁 Estructura del proyecto

Este proyecto está organizado de forma modular para facilitar su comprensión y escalabilidad:

```
api-prisma-node/
├── controllers/        → Lógica del negocio (ej. obtener categorías)
├── routes/             → Define las rutas del servidor (por URL)
├── middlewares/        → Funciones intermedias (como logs o validaciones)
├── utils/              → Funciones auxiliares, como la conexión a Prisma
├── prisma/             → Contiene el archivo schema.prisma (esquema de base de datos)
├── documents/          → Script SQL para crear la base de datos manualmente
├── app.js              → Configura y centraliza el servidor Express
├── main.js             → Punto de entrada del servidor
├── .env                → Variables de entorno (usuario/contraseña BD)
├── package.json        → Dependencias del proyecto y scripts de inicio
```

---

## 🛠️ ¿Cómo usar este proyecto?

### Paso 1: Clonar el proyecto (opcional)

Si el código ya está en tu computadora, puedes saltar este paso.

```bash
git clone https://github.com/tuusuario/api-prisma-node.git
cd api-prisma-node
```

---

### Paso 2: Instalar las dependencias

Esto instalará librerías como Express, Prisma, Morgan, etc.

```bash
npm install
```

---

### Paso 3: Crear la base de datos

Abre PostgreSQL (puedes usar pgAdmin o DBeaver) y crea una base de datos llamada por ejemplo:

```
taller_db
```

---

### Paso 4: Configurar el archivo `.env`

Abre el archivo `.env` y coloca tus datos de conexión:

```
DATABASE_URL="postgresql://postgres:tu_contraseña@localhost:5432/taller_db?schema=public"
```

Reemplaza `tu_contraseña` con la que usas para entrar a PostgreSQL.

---

### Paso 5: Leer la base de datos con Prisma

Este comando lee el esquema desde la base de datos real y lo actualiza localmente:

```bash
npx prisma db pull
```

---

### Paso 6: Generar el cliente Prisma

Este paso genera el código necesario para que Prisma funcione en tu proyecto:

```bash
npx prisma generate
```

⚠️ Este paso es obligatorio para que puedas usar `@prisma/client` en tu código.

---

### Paso 7: Levantar el servidor

Ya puedes iniciar tu servidor con el siguiente comando:

```bash
npm run dev
```

Si todo está bien, verás algo como esto en consola:

```
http://localhost:5000/api/v1
Backend Starts 5000 ✅💪🟢
```

---

## ✅ ¿Cómo saber si está funcionando?

1. Abre Postman
2. Prueba la siguiente URL con método GET:

```
http://localhost:5000/api/v1/categorias
```

(Tranquilo, si todavía no devuelve nada, lo veremos durante el taller.)

---

## 🧠 Notas importantes

* Cada vez que cambies algo en la base de datos, recuerda ejecutar:

  * `npx prisma db pull`
  * `npx prisma generate`

* Si el proyecto no arranca:

  * Verifica que PostgreSQL esté encendido
  * Revisa que el `.env` tenga la contraseña correcta
  * Asegúrate de haber corrido los comandos anteriores

---

## 🧑‍🏫 ¿Qué aprenderemos?

Durante el taller trabajaremos en:

* Conectar controladores a la base de datos con Prisma
* Definir rutas con Express
* Validar y mostrar información desde PostgreSQL
* Probar los endpoints con Postman

