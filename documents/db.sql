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
  precio NUMERIC(10,2) NOT NULL CHECK (precio >= 0),
  categoria_id INTEGER NOT NULL,
  CONSTRAINT fk_producto_categoria
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
    ON DELETE RESTRICT ON UPDATE CASCADE
);

-- 4. Índices útiles
CREATE INDEX idx_productos_categoria ON productos(categoria_id);

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
