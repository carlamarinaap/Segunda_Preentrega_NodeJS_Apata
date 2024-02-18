import express from "express";
import CartsManager from "../dao/manager_mongo/cartsMaganer.js";

const router = express.Router();
const cm = new CartsManager();

//----------------------//
//----------------------//
//----------------------//
// FALTA HACER UN PUT   //
//----------------------//
//----------------------//
//----------------------//
//----------------------//

router.get("/", async (req, res) => {
  try {
    const carts = await cm.getCarts();
    res.status(200).send(carts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cm.getCartById(cartId);
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", (req, res) => {
  try {
    cm.addCart();
    res.status(200).send("Se agregó correctamente el carrito");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    await cm.updateCart(cartId, productId);
    res.status(200).send("Producto añadido al carrito");
  } catch (error) {
    res.status(500).send(`Error al actualizar el carrito: ${error.message}`);
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cm.cleanCartById(cartId);
    res.status(200).send("Se vació el carrito");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    await cm.deleteProduct(cartId, productId);
    res.status(200).send("Producto eliminado del carrito");
  } catch (error) {
    res.status(500).send(`Error al eliminar el producto del carrito: ${error.message}`);
  }
});

router.put("/:cid", async (req, res) => {
  // deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
  try {
    const cartId = req.params.cid;
  } catch (error) {}
});

router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    cm.updateProductsCart(cartId, productId, req.body);
    res.status(200).send("Cantidad de productos actualizados en el carrito");
  } catch (error) {
    res
      .status(500)
      .send(
        `Error al actualizar la cantidad de productos en el carrito: ${error.message}`
      );
  }
});

export default router;
