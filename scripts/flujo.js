
// Verificando si hay info de la session o se inicia un carrito nuevo

let carritoSession = JSON.parse(sessionStorage.getItem('carrito'))

if (carritoSession) {
    carrito = carritoSession
    crearContenido(carrito);
} else {
    //Iniciamos un nuevo carrito
    resetearUnidadesCarrito();
    //Elementos iniciales
    let listaVenta = productos;
    crearContenido(listaVenta);
}


//Eventos para filtrar por stock

funcionalidadBotones();

const stock = document.getElementsByName("stock");

for (let i of stock) {
    i.onclick = function (){
        if (i.value === 'todo'){
            listaProductos.replaceChildren();
            listaVenta = carrito;
            crearContenido(listaVenta);
            funcionalidadBotones();
            filtroTipo.value = 'Mostrar todo';
        } else if (i.value === 'enStock') {
            listaVenta = carrito.filter((item) => item.stock == true);
            listaProductos.replaceChildren();
            crearContenido(listaVenta);
            funcionalidadBotones();
            filtroTipo.value = 'Mostrar todo';
        }
    }
}

// Evento para cerrar la visualizacion del carrito

let cerrarCarrito = document.getElementById('cerrarCarrito')

cerrarCarrito.addEventListener("click", ()  => {        
    asideCarrito.classList.remove('carritoVisible')
    asideCarrito.classList.add('carritoInvisible')})


// Creo elementos para filtrar por clase de producto

let filtroClase = document.getElementById('filtroClase')

let listaFiltrada = carrito


//Para que la lista ande mas fluida, al clickearla se resetea

filtroClase.addEventListener("click", ()  => {        
    filtroClase.value = '';
})



// Eventos del filtro de clase de producto

filtroClase.addEventListener("change", ()  => {        
    if (filtroClase.value == "Alimentos") {
        listaFiltrada = carrito
        listaFiltrada = listaFiltrada.filter((item) => item.clase == "alimento");
        listaProductos.replaceChildren();
        crearContenido(listaFiltrada);
        funcionalidadBotones();
    } else if (filtroClase.value == "Bebidas") {
        listaFiltrada = carrito
        listaFiltrada = listaFiltrada.filter((item) => item.clase == "bebida");
        listaProductos.replaceChildren();
        crearContenido(listaFiltrada);
        funcionalidadBotones();
    } else if (filtroClase.value == "Limpieza") {
        listaFiltrada = carrito
        listaFiltrada = listaFiltrada.filter((item) => item.clase == "limpieza");
        listaProductos.replaceChildren();
        crearContenido(listaFiltrada);
        funcionalidadBotones();
    } else {
        listaFiltrada = carrito
        listaProductos.replaceChildren();
        crearContenido(listaFiltrada);
        funcionalidadBotones();
    }
})