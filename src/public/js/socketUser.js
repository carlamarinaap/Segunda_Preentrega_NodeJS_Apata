const socket = io();

const addProductInCart = document.getElementById("addProductInCart");
socket.emit("newCart");

socket.on("purchases", (newCart) => {
  addProductInCart.addEventListener("click", (e) => {
    e.preventDefault();
    let productId = e.target.dataset.id;
    socket.emit("newProductInCart", { productId, newCart });
    Swal.fire({
      title: "Producto agregado al carrito",
    });
  });
});
