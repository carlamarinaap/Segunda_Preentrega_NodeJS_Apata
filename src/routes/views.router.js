import express from "express";
import ProductManager from "../dao/manager_mongo/productMaganer.js";
import MessageManager from "../dao/manager_mongo/messageManager.js";

const router = express.Router();
const pm = new ProductManager();
const mm = new MessageManager();

router.get("/", async (req, res) => {
  const products = await pm.getProducts();
  res.render("home", { products });
});

router.get("/socket", (req, res) => {
  res.render("socket");
});

router.get("/realTimeProducts", async (req, res) => {
  const products = await pm.getProducts();
  res.render("realTimeProducts", { products });
});

router.get("/chat", async (req, res) => {
  const messages = await mm.getMessages();
  res.render("chat", { messages });
});

router.get("cart/:cid", async (req, res) => {
  cartId = req.params.cid;
  const products = await pm.getProducts();
  res.render("inCart", { products, cartId });
});

router.get("/products", async (req, res) => {
  /*
Crear una vista en el router de views ‘/products’ para visualizar todos los productos con su respectiva paginación. Cada producto mostrado puede resolverse de dos formas:
Llevar a una nueva vista con el producto seleccionado con su descripción completa, detalles de precio, categoría, etc. Además de un botón para agregar al carrito.
Contar con el botón de “agregar al carrito” directamente, sin necesidad de abrir una página adicional con los detalles del producto.

Además, agregar una vista en ‘/carts/:cid (cartId) para visualizar un carrito específico, donde se deberán listar SOLO los productos que pertenezcan a dicho carrito. 
 */
  const products = await pm.getProducts();
  res.render("products", { products });
});

export default router;
