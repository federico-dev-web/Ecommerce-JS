// Creando los objetos que se venderian en el sitio web

const productos = [
    { tipo: "fideos", precio: 155, stock: true, img: "./assets/images/fideos.jpg"},
    { tipo: "polenta", precio: 72, stock: true, img: "./assets/images/polenta.jpg"},
    { tipo: "porotos", precio: 85, stock: true, img: "./assets/images/porotos.jpg"},
    { tipo: "carne", precio: 1050, stock: false, img: "./assets/images/carne.jpg"},
    { tipo: "pollo", precio: 620, stock: true, img: "./assets/images/pollo.jpg"},
    { tipo: "pan", precio: 200, stock: true, img: "./assets/images/pan.jpg"},
    { tipo: "agua", precio: 93, stock: true, img: "./assets/images/agua.jpg"},
    { tipo: "cerveza", precio: 174, stock: false, img: "./assets/images/cerveza.jpg"},
    { tipo: "gaseosa", precio: 191, stock: true, img: "./assets/images/gaseosa.jpg"},
    { tipo: "leche", precio: 102, stock: true, img: "./assets/images/leche.jpg"}
];

// Creando carrito de compras
let carrito = productos;

const resetearUnidadesCarrito = () => {
    for (let i of carrito) { 
        i.cantidad = 0;
    };
};

resetearUnidadesCarrito();

//Funcion para crear los elementos html

const crearContenido = (listaVenta) => {
    for (const item of listaVenta) {
        //Creamos los elementos HTML
        const lista = document.createElement('li');
        const imagenProducto = document.createElement('img');
        const nombreProducto = document.createElement('h3');
        const precioProducto = document.createElement('p');
        const agregarUnidades = document.createElement('div');
        const agregarUnidadesMas = document.createElement('button');
        const agregarUnidadesSpan = document.createElement('span');
        const agregarUnidadesMenos = document.createElement('button');
    
        //Le agregamos el contenido a los elementos
        imagenProducto.src = item.img;
        nombreProducto.textContent = item.tipo.charAt(0).toUpperCase()+item.tipo.slice(1);
        precioProducto.append(`$ ${item.precio}`);
    
        agregarUnidadesMas.className = "mas"
        agregarUnidadesMas.id = "mas"+ item.tipo
        agregarUnidadesMas.textContent = "+"
        agregarUnidadesSpan.className = "numero"
        agregarUnidadesSpan.id = "numero"+ item.tipo
        agregarUnidadesSpan.textContent = "0"
        agregarUnidadesMenos.className = "menos"
        agregarUnidadesMenos.id = "menos"+ item.tipo
        agregarUnidadesMenos.textContent = "-"
        agregarUnidades.append(agregarUnidadesMenos, agregarUnidadesSpan, agregarUnidadesMas) 
    
        //Agregamos los elementos creados a su elemento contenedor que es li
        lista.append(imagenProducto, nombreProducto, precioProducto, agregarUnidades);
        //Le agregamos al contenedor de la tienda cada uno de los divProducto
        listaProductos.append(lista);
    }
};


const funcionalidadBotones = () => {
    //Agregar unidades de cada producto al carrito
    const botonesMas = document.getElementsByClassName("mas");
    const numeros = document.getElementsByClassName("numero");
    const botonesMenos = document.getElementsByClassName("menos");

    document.onclick = function () {
        const botonesMas = document.getElementsByClassName("mas");
        const numeros = document.getElementsByClassName("numero");
        const botonesMenos = document.getElementsByClassName("menos");
    }

    //Boton Mas
    for(let i of botonesMas) {
        i.onclick = function () { 
            //Reasigno el valor de la cantidad en html
            numeros.namedItem("numero"+(i.id.slice(3))).textContent = Number(numeros.namedItem("numero"+(i.id.slice(3))).textContent) + 1;
            //Sumo cantidad al carrito
            carrito.filter(el => el.tipo == (i.id.slice(3)))[0].cantidad = Number(numeros.namedItem("numero"+(i.id.slice(3))).textContent);
        }
    }
    //Boton Menos
    for(let i of botonesMenos) {
        i.onclick = function () { 
            if (numeros.namedItem("numero"+(i.id.slice(5))).textContent==0){
            } else {
                //Reasigno el valor de la cantidad en html
                numeros.namedItem("numero"+(i.id.slice(5))).textContent = Number(numeros.namedItem("numero"+(i.id.slice(5))).textContent) - 1;
                //Resto cantidad al carrito
                carrito.filter(el => el.tipo == (i.id.slice(5)))[0].cantidad = Number(numeros.namedItem("numero"+(i.id.slice(5))).textContent);
            }
        }
    }

    //Creacion Carrito
    const carritoHtml = document.getElementById("carrito");
    const botonVerCarrito = document.getElementById("verCarrito");
    let carritoVer = carrito.filter(el => el.cantidad>0);

    const verCarrito = (carritoVer) => {
        for (let i in carritoVer) {    
            const p1 = document.createElement('p');
            p1.append(`${carritoVer[i].cantidad} unidades de ${carritoVer[i].tipo}, por un valor de $ ${carritoVer[i].precio*carritoVer[i].cantidad}`);
            carritoHtml.append(p1);
        } 
    }
    //Boton Carrito
    botonVerCarrito.onclick = function () { 
        carritoVer = carrito.filter(el => el.cantidad>0);
        if (carritoVer.length == 0) { 
            carritoHtml.replaceChildren();
            carritoHtml.append(document.createElement('p').textContent = 'Su carrito esta vacio, elija los productos que desea comprar.');
        } else {
            carritoHtml.replaceChildren();
            let carritoVer = carrito.filter(el => el.cantidad>0);
            verCarrito(carritoVer);
            const p2 = document.createElement('p');
            p2.append(`El total de la compra es de $ ${carritoVer.reduce((acc, item) => acc + item.precio, 0)}`);
            carritoHtml.append(p2);
            let sinStock = carritoVer.find(el => el.stock==false);
            if (sinStock != undefined ){
                const p3 = document.createElement('p');
                p3.append('Eligió productos que no se encuentran en stock, su pedido tardará una semana mas de lo previsto');
                carritoHtml.append(p3);
            }   
        }
    }
}


//Elementos iniciales
let listaVenta = productos;
crearContenido(listaVenta);

//Filtro de stock
const stock = document.getElementsByName("stock");

funcionalidadBotones();

for (let i of stock) {
    i.onclick = function (){
        if (i.value === 'todo'){
            listaProductos.replaceChildren();
            listaVenta = productos;
            crearContenido(listaVenta);
            resetearUnidadesCarrito()
            funcionalidadBotones();
        } else if (i.value === 'enStock') {
            listaVenta = productos.filter((item) => item.stock == true);
            listaProductos.replaceChildren();
            crearContenido(listaVenta);
            resetearUnidadesCarrito()
            funcionalidadBotones();
        }
    }
}




