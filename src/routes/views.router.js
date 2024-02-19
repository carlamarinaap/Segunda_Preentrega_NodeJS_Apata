import express from "express";
import ProductManager from "../dao/manager_mongo/productMaganer.js";
import MessageManager from "../dao/manager_mongo/messageManager.js";
import CartsManager from "../dao/manager_mongo/cartsMaganer.js";

const router = express.Router();
const pm = new ProductManager();
const mm = new MessageManager();
const cm = new CartsManager();

router.get("/", async (req, res) => {
  const products = await pm.getProducts();
  const allProducts = await pm.getProducts(products.totalDocs);
  console.log(allProducts);
  res.render("home", { allProducts });
});

router.get("/socket", (req, res) => {
  res.render("socket");
});

router.get("/realTimeProducts", async (req, res) => {
  const products = await pm.getProducts();
  const allProducts = await pm.getProducts(products.totalDocs);
  res.render("realTimeProducts", { allProducts });
});

router.get("/chat", async (req, res) => {
  const messages = await mm.getMessages();
  res.render("chat", { messages });
});

router.get("/carts/:cid", async (req, res) => {
  let cartId = req.params.cid;
  const cart = await cm.getCartById(cartId);
  const cartStringify = JSON.stringify(cart);
  const cartJSON = JSON.parse(cartStringify);
  cartJSON.products.forEach((prod) => {
    prod.total = prod.quantity * prod.product.price;
  });
  res.render("inCart", { cartJSON });
});

router.get("/products", async (req, res) => {
  let { limit, page, sort, filter } = req.query;
  const products = await pm.getProducts(limit, page, sort, filter);
  page ? page : (page = 1);
  let isValid = page > 0 && page <= products.totalPages;
  products.prevLink = products.hasPrevPage
    ? `http://localhost:8080/products?page=${products.prevPage}`
    : null;
  products.nextLink = products.hasNextPage
    ? `http://localhost:8080/products?page=${products.nextPage}`
    : null;
  res.render("products", { products, limit, page, isValid });
});

export default router;
