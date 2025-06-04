import { conexion } from "../utils/conexion.js";

export async function mostrarProductos(req, res) {
   try {
      // select * from productos
      const productos = await conexion.productos.findMany({
         include: {
            categorias: {
               select: { nombre: true }
            }
         }
      });
      res.json(productos);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener productos" });
   }
}

export async function agregarProducto(req, res) {
   try {
      const { nombre, descripcion, precio, categoria_id } = req.body;
      const nuevoProducto = await conexion.productos.create({
         data: {
            nombre,
            descripcion,
            precio,
            categoria_id
         }
      });
      res.status(201).json(nuevoProducto);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al agregar producto" });
   }
}

export async function eliminarProducto(req, res) {
   try {
      const { id } = req.params;
      await conexion.productos.delete({
         where: { id: Number(id) }
      });
      res.json({ message: "Producto eliminado correctamente" });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al eliminar producto" });
   }
}