// Creando los objetos que se venderian en el sitio web

const productos = [
    { tipo: "fideos", precio: 155, stock: true},
    { tipo: "polenta", precio: 72, stock: true},
    { tipo: "porotos", precio: 85, stock: true},
    { tipo: "carne", precio: 1050, stock: false},
    { tipo: "pollo", precio: 620, stock: true},
    { tipo: "pan", precio: 200, stock: true},
    { tipo: "agua", precio: 93, stock: true},
    { tipo: "cerveza", precio: 174, stock: false},
    { tipo: "gaseosa", precio: 191, stock: true},
    { tipo: "leche", precio: 102, stock: true}
];

//listado con objetos disponibles para comprar
const listaVenta = productos.filter((el) => el.stock == true);


// Creando las funciones para relaizar las compras
const imprimirListadoDeProductos = (listaVenta) => ((listaVenta.map((item) => item.tipo + ' a un valor de  $ ' + item.precio)).join('\n')).toLocaleLowerCase();

const agregarAlCarrito = (carrito, listaVenta) => {
    let carrito2 = carrito.replace(/\s+/g, '');
    let carritoArr = carrito2.split(",");
    let resultado = listaVenta.filter((item) => carritoArr.includes(item.tipo)==true);
    return resultado;
};

const imprimirCarrito = (listaCompra) => {
    let textoInicial = "Estos son los productos agregados a su compra: \n"
    let lista = ((listaCompra.map((item) => item.tipo + ' a un valor de  $ ' + item.precio)).join('\n')).toLocaleLowerCase();
    let total = listaCompra.reduce((acc, item) => acc + item.precio, 0)
    let textoFinal = "\nSi desea confirmar su compra ingrese 'si'."
    return (textoInicial+lista+"\nEl total de su compra es $ "+total+ textoFinal)
};


//interaccion con el usuario

comprador = prompt("Bienvenido a nuestro e-commerce, si desea realizar una compra y acceder a nuestra lista de precios ingrese 'si':").toLocaleLowerCase()

if (comprador === 'si') {
    let carrito = prompt("Le ofreceremos los productos en stock, ingrese los nombres separados por coma de los que desee agregar a su compra: \n" + imprimirListadoDeProductos(listaVenta)).toLocaleLowerCase();
    let listaCompra = agregarAlCarrito(carrito,listaVenta);
    let confirmaCompra = prompt(imprimirCarrito(listaCompra)).toLocaleLowerCase();
    if (confirmaCompra === 'si') {
        alert("Muchas gracias por su compra, vuelva pronto.");
    } else {
        alert("Muchas gracias por visitar nuestra página, vuelva pronto.");
    }
} else {
    alert("Muchas gracias por visitar nuestra página, vuelva pronto.");
}