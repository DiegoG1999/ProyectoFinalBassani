const shopContent = document.getElementById("contenedordecompras");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let verCarrito = document.getElementById("cart-btn");
let carritoContainer = document.getElementById("carrito__container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

const pedirProductos = async () => {
    const response = await fetch("data.json");
    const data = await response.json();

    data.forEach((product) => {
        let content = document.createElement("div");
        content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p> ${product.precio} $</p>
    `;
        shopContent.append(content);

        let buyButton = document.createElement("button");
        buyButton.className = "boton__comprar"
        buyButton.innerText = "Agregar al carrito";

        content.append(buyButton)

        buyButton.addEventListener("click", () => {
            const repetido = carrito.some((repetirProducto) => repetirProducto.id === product.id);

            if (repetido) {
                carrito.map((prod) => {
                    if (prod.id === product.id) {
                        prod.cantidad++;
                    }
                });
            } else {
                carrito.push({
                    id: product.id,
                    nombre: product.nombre,
                    precio: product.precio,
                    cantidad: product.cantidad,
                    img: product.img,
                });
            }
            carritoContenido();
            guardadoEnLocal();
        });
    });

    
};

pedirProductos();

const guardadoEnLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};



