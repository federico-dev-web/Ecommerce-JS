
// Creando carrito de compra
let carrito = productos;

const resetearUnidadesCarrito = () => {
    for (let i of carrito) { 
        i.cantidad = 0;
    };
};


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
        agregarUnidadesSpan.textContent = item.cantidad
        agregarUnidadesMenos.className = "menos"
        agregarUnidadesMenos.id = "menos"+ item.tipo
        agregarUnidadesMenos.textContent = "-"
        agregarUnidades.append(agregarUnidadesMenos, agregarUnidadesSpan, agregarUnidadesMas) 
    
        //Agregamos los elementos creados a su elemento contenedor que es li
        lista.append(imagenProducto, nombreProducto, precioProducto, agregarUnidades);
        //Le agregamos al contenedor de la tienda cada uno de los divProducto
        console.log(lista)
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
            //carrito.filter(el => el.tipo == (i.id.slice(3)))[0].cantidad = Number(numeros.namedItem("numero"+(i.id.slice(3))).textContent);
            carrito.map(el => el.tipo == (i.id.slice(3)) ? el.cantidad = Number(numeros.namedItem("numero"+(i.id.slice(3))).textContent) : el)
            sessionStorage.setItem('carrito',JSON.stringify(carrito))
            Toastify({
                text: "Agregaste 1 unidad de "+i.id.slice(3)+" a tu carrito.",
                duration: 1000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                background: "linear-gradient(to right, #bdc3c7, #2c3e50)",
                },
                onClick: function(){} // Callback after click
            }).showToast()
        }
    }
    //Boton Menos
    for(let i of botonesMenos) {
        i.onclick = function () { 
            numeros.namedItem("numero"+(i.id.slice(5))).textContent==0 || (
                //Reasigno el valor de la cantidad en html
                numeros.namedItem("numero"+(i.id.slice(5))).textContent = Number(numeros.namedItem("numero"+(i.id.slice(5))).textContent) - 1,
                //Resto cantidad al carrito
                //carrito.filter(el => el.tipo == (i.id.slice(5)))[0].cantidad = Number(numeros.namedItem("numero"+(i.id.slice(5))).textContent),
                carrito.map(el => el.tipo == (i.id.slice(5)) ? el.cantidad = Number(numeros.namedItem("numero"+(i.id.slice(5))).textContent) : el),
                sessionStorage.setItem('carrito',JSON.stringify(carrito)),
                Toastify({
                    text: "Quitaste 1 unidad de "+i.id.slice(5)+" a tu carrito.",
                    duration: 1000,
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                    background: "linear-gradient(to right, #bdc3c7, #2c3e50)",
                    },
                    onClick: function(){} // Callback after click
                }).showToast()
            )
        }
    }

    //Creacion Carrito
    const carritoHtml = document.getElementById("carrito");
    const botonVerCarrito = document.getElementById("verCarrito");
    let carritoVer = carrito.filter(el => el.cantidad>0);

    const crearContenidoCarrito = (carritoinput) => {
        let lista = document.createElement('ul');
        for (const item of carritoinput) {
            //Creamos los elementos HTML
            let elLista = document.createElement('li');
            let imagenProducto = document.createElement('img');
            let nombreProducto = document.createElement('span');
            let precioProducto = document.createElement('span');
            let cantidadUnidades = document.createElement('span');
            let totalPrecioProducto = document.createElement('span');
            let quitarProducto = document.createElement('button');
        
            //Le agregamos el contenido a los elementos
            imagenProducto.src = item.img;
            elLista.id = item.tipo+"Carrito"
            nombreProducto.textContent = item.tipo.charAt(0).toUpperCase()+item.tipo.slice(1);
            cantidadUnidades.append(`${item.cantidad} un`);
            precioProducto.append(`$ ${item.precio} c/u`);
            totalPrecioProducto.append(`$ ${item.precio*item.cantidad} total`);
            quitarProducto.textContent = "Quitar productos"
            quitarProducto.id = "quitar"+ item.tipo
            quitarProducto.className = "botonesQuitar"
        
            //Agregamos los elementos creados a su elemento contenedor que es li
            elLista.append(imagenProducto, nombreProducto, precioProducto, cantidadUnidades, totalPrecioProducto, quitarProducto);
            //Le agregamos al contenedor de la tienda cada uno de los divProducto
            lista.append(elLista);
        }
        carritoHtml.append(lista);

        // Asiganndo funcionalidad a los botones de quitar productos
        let quitar = document.getElementsByClassName('botonesQuitar')

        for (i in quitar) {
            let el = quitar[i]
            el.onclick = function () { 
                //Elimino el elemento HTML del carrito
                document.getElementById((el.id.slice(6))+"Carrito").remove()
                //Actualizar elemento de carrito, del session storage
                carrito.map(item => item.tipo == (el.id.slice(6)) ? item.cantidad = Number(0) : item)
                carritoVer.map(item => item.tipo == (el.id.slice(6)) ? item.cantidad = 0 : item)
                sessionStorage.setItem('carrito',JSON.stringify(carrito))
                //Volver a cargar totales del carrito
                totalCarrito = document.getElementById("totalCarrito")
                totalCarrito.textContent = ''
                totalCarrito.append(`El total de la compra es de $ ${carritoVer.reduce((acc, item) => acc + item.precio*item.cantidad, 0)}`)      
                //Actualizar HTML del listado de productos
                document.getElementById('numero'+el.id.slice(6)).textContent = 0
                Toastify({
                    text: "Eliminaste: "+el.id.slice(6)+" de tu carrito.",
                    duration: 1000,
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                    background: "linear-gradient(to right, #bdc3c7, #2c3e50)",
                    },
                    onClick: function(){} // Callback after click
                }).showToast();
            }
        }
    };


    //Boton Carrito
    botonVerCarrito.onclick = function () { 
        carritoVer = carrito.filter(el => el.cantidad>0);
        let asideCarrito = document.getElementById("asideCarrito");
        asideCarrito.classList.remove('carritoInvisible')
        asideCarrito.classList.add('carritoVisible')
        carritoVer.length == 0 ? (
            carritoHtml.replaceChildren(),
            carritoHtml.append(document.createElement('p').textContent = 'Su carrito esta vacio, elija los productos que desea comprar.')
        ) : (
            carritoHtml.replaceChildren(),
            carritoVer = carrito.filter(el => el.cantidad>0),
            crearContenidoCarrito(carritoVer),
            p2 = document.createElement('p'),
            p2.append(`El total de la compra es de $ ${carritoVer.reduce((acc, item) => acc + item.precio*item.cantidad, 0)}`),
            p2.id = 'totalCarrito',
            carritoHtml.append(p2),
            sinStock = carritoVer.find(el => el.stock==false),
            sinStock != undefined && (
                p3 = document.createElement('p'),
                p3.append('Eligió productos que no se encuentran en stock, su pedido tardará una semana mas de lo previsto'),
                p3.id = 'carritoLeyendaSinStock',
                carritoHtml.append(p3)
            )       
        )
    }
}


