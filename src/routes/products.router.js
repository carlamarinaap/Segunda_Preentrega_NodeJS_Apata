import express from "express";
import ProductManager from "../dao/manager_mongo/productMaganer.js";

const pm = new ProductManager();
const router = express.Router();

/*

Con base en nuestra implementación actual de productos, modificar el método GET / para que cumpla con los siguientes puntos:
Deberá poder recibir por query params un limit (opcional), una page (opcional), un sort (opcional) y un query (opcional)
-limit permitirá devolver sólo el número de elementos solicitados al momento de la petición, en caso de no recibir limit, éste será de 10.
page permitirá devolver la página que queremos buscar, en caso de no recibir page, ésta será de 1

query, el tipo de elemento que quiero buscar (es decir, qué filtro aplicar), en caso de no recibir query, realizar la búsqueda general
sort: asc/desc, para realizar ordenamiento ascendente o descendente por precio, en caso de no recibir sort, no realizar ningún ordenamiento

El método GET deberá devolver un objeto con el siguiente formato:
{
  status:success/error
  payload: Resultado de los productos solicitados
  totalPages: Total de páginas
  prevPage: Página anterior
  nextPage: Página siguiente
  page: Página actual
  hasPrevPage: Indicador para saber si la página previa existe
  hasNextPage: Indicador para saber si la página siguiente existe.
  prevLink: Link directo a la página previa (null si hasPrevPage=false)
  nextLink: Link directo a la página siguiente (null si hasNextPage=false)
}

Se deberá poder buscar productos por categoría o por disponibilidad, y se deberá poder realizar un ordenamiento de estos productos de manera ascendente o descendente por precio.
*/
router.get("/", async (req, res) => {
  try {
    const { limit, page, sort } = req.query;
    const products = await pm.getProducts();
    if (limit) {
      const limitedProducts = products.slice(0, parseInt(limit));
      res.status(200).send(limitedProducts);
    } else {
      res.status(200).send(products);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await pm.getProductById(productId);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const product = await pm.addProduct(req.body);
    res.status(200).send(`Producto agregado: ${JSON.stringify(product)}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await pm.updateProduct(productId, req.body);
    res.status(200).send(`Producto actualizado: ${JSON.stringify(product)}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:pid", (req, res) => {
  try {
    const productId = req.params.pid;
    pm.deleteProduct(productId);
    res.status(200).send(`Producto con id ${productId} eliminado`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
