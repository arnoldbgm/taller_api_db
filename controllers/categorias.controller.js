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