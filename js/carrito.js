//----header del carrito

const ordenCarrito = () => {
    carritoContainer.innerHTML = ""
    carritoContainer.style.display = "flex"
    let carritoPag = document.createElement("div");
    carritoPag.className = "carrito__header";
    carritoPag.innerHTML = `
        <h1 class= "carrito__pag__h1">Carrito</h1>
        `;

    carritoContainer.append(carritoPag);

    let carritoBoton = document.createElement("button");
    carritoBoton.innerText = "x";
    carritoBoton.className = "carrito__header__boton";

    carritoBoton.addEventListener("click", () => {
        carritoContainer.style.display = "none"
    });

    carritoPag.append(carritoBoton);

    //------cuerpo del carrito


    carrito.forEach((product) => {
        let depositoCarrito = document.createElement("div");
        depositoCarrito.className = "deposito__carrito"
        depositoCarrito.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre} </h3>
            <p>${product.precio} $ </p>
            <span class= "restar"> - </span>
            <p> Cantidad: ${product.cantidad} </p>
            <span class ="sumar"> + </span>
            <p>Total: ${product.precio * product.cantidad} $ </p>
            <span class ="eliminar__boton"> ✖️ </span>

            `;

        carritoContainer.append(depositoCarrito);


        let restar = depositoCarrito.querySelector(".restar");
        restar.addEventListener("click", () => {
            if (product.cantidad !== 1) {
                product.cantidad--;
            }
            ordenCarrito();
            guardadoEnLocal();
        });
        let sumar = depositoCarrito.querySelector(".sumar");
        sumar.addEventListener("click", () => {
            product.cantidad++
            ordenCarrito();
            guardadoEnLocal();
        });

        let eliminar = depositoCarrito.querySelector(".eliminar__boton");
        eliminar.addEventListener("click", () => {
            eliminarProducto(product.id);
        })

    });
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    //----------footer del carrito

    const totalPagina = document.createElement("div");
    totalPagina.className = "total__pagina";
    totalPagina.innerHTML = `total a pagar: ${total} $ `;
    carritoContainer.append(totalPagina);

    const finalizarCompra = document.createElement("button");
    finalizarCompra.className = "finalizar__compra";
    finalizarCompra.innerText = "Finalizar compra";

    finalizarCompra.addEventListener("click", () => {
        Swal.fire('su compra ha sido realizada con exito')
    })

    carritoContainer.append(finalizarCompra);
}

verCarrito.addEventListener("click", ordenCarrito);

const eliminarProducto = (id) => {
    const productoId = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== productoId;

    });
    ordenCarrito();
    carritoContenido();
    guardadoEnLocal();
};

const carritoContenido = () => {
    cantidadCarrito.style.display = "block";

    const carritolocal = carrito.length;
    localStorage.setItem("carritoGuardado", JSON.stringify(carritolocal));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoGuardado"));

}
carritoContenido();