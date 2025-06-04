import { conexion } from "../utils/conexion.js"

export async function mostrarCategorias(req, res) {
   try {
      // select  * from categorias
      const categorias = await conexion.categorias.findMany();
      res.json(categorias);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener categorías" });
   }
}

// Nueva función para crear una categoría
export async function crearCategoria(req, res) {
   try {
      const { nombre, descripcion } = req.body;
      if (!nombre) {
         return res.status(400).json({ error: "El nombre es requerido" });
      }
      // Cada vez que veamos algo que dice conexion o prisma
      // Significa que estamos usando la ORM
      const nuevaCategoria = await conexion.categorias.create({
         data: { nombre, descripcion }
      });
      res.status(201).json(nuevaCategoria);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear la categoría" });
   }
}

// Nueva funcion para poder eliminar una categoria en especifico
export async function eliminarCategoria(req, res) {
   try {
      const { id } = req.params;
      // Verifica si la categoría existe antes de eliminar
      const categoria = await conexion.categorias.findUnique({ where: { id: Number(id) } });
      if (!categoria) {
         return res.status(404).json({ error: "Categoría no encontrada" });
      }
      await conexion.categorias.delete({ where: { id: Number(id) } });
      res.json({ mensaje: "Categoría eliminada correctamente" });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al eliminar la categoría" });
   }
}

export async function actualizarCategoria(req, res) {
   try {
      const { id } = req.params;
      const { nombre, descripcion } = req.body;

      // Verifica si la categoría existe
      const categoria = await conexion.categorias.findUnique({ where: { id: Number(id) } });
      if (!categoria) {
         return res.status(404).json({ error: "Categoría no encontrada" });
      }

      // Actualiza la categoría
      const categoriaActualizada = await conexion.categorias.update({
         where: { id: Number(id) },
         data: { nombre, descripcion }
      });

      res.json(categoriaActualizada);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al actualizar la categoría" });
   }
}