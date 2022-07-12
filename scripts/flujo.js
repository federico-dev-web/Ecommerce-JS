
// Verificando si hay info de la session o se inicia un carrito nuevo

let carritoSession = JSON.parse(sessionStorage.getItem('carrito'))



carritoSession ? (
        carrito = carritoSession,
        crearContenido(carrito)
    ) : (
        //Iniciamos un nuevo carrito
        resetearUnidadesCarrito(),
        //Elementos iniciales
        listaVenta = productos,
        listaProductos = document.getElementById('listaProductos'),
        crearContenido(listaVenta)
    )


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


// Creo elementos para filtrar por clase de producto

let finalizarCompra = document.getElementById('finalizarCompra')


//Para que la lista ande mas fluida, al clickearla se resetea

finalizarCompra.addEventListener("click", ()  => {  
let monto = carrito.reduce((acc, item) => acc + item.precio*item.cantidad, 0)
    swal({
        title: "Desea confirmar su compra por $ "+monto,
        text: "Una vez confirmado, el monto será cargado en su tarjeta de crédito.",
        icon: "info",
        buttons: true
        })
        .then((willDelete) => {
            if (willDelete) {
                swal("Su compra ha sido procesada! Muchas gracias!!", {
                icon: "success",
                });
            } else {
                swal("Su compra continuará pendiente de confirmación");
            }
        });
})
