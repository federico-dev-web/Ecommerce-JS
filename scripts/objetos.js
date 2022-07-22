// Creando los objetos que se venderian en el sitio web

const productos = [
    { tipo: "fideos", precio: 155, stock: true, img: "./assets/images/fideos.jpg", clase: "alimento"},
    { tipo: "polenta", precio: 72, stock: true, img: "./assets/images/polenta.jpg", clase: "alimento"},
    { tipo: "porotos", precio: 85, stock: true, img: "./assets/images/porotos.jpg", clase: "alimento"},
    { tipo: "carne", precio: 1050, stock: false, img: "./assets/images/carne.jpg", clase: "alimento"},
    { tipo: "pollo", precio: 620, stock: true, img: "./assets/images/pollo.jpg", clase: "alimento"},
    { tipo: "pan", precio: 200, stock: true, img: "./assets/images/pan.jpg", clase: "alimento"},
    { tipo: "agua", precio: 93, stock: true, img: "./assets/images/agua.jpg", clase: "bebida"},
    { tipo: "cerveza", precio: 174, stock: false, img: "./assets/images/cerveza.jpg", clase: "bebida"},
    { tipo: "gaseosa", precio: 191, stock: true, img: "./assets/images/gaseosa.jpg", clase: "bebida"},
    { tipo: "detergente", precio: 205, stock: true, img: "./assets/images/detergente.jpg", clase: "limpieza"},
    { tipo: "desodorante de ambiente", precio: 102, stock: true, img: "./assets/images/desodoranteAmbiente.jpg", clase: "limpieza"},
    { tipo: "vino", precio: 513, stock: true, img: "./assets/images/vino.jpg", clase: "bebida"},
    { tipo: "lavandina", precio: 89, stock: false, img: "./assets/images/lavandina.jpg", clase: "limpieza"},
    { tipo: "jabon en polvo", precio: 341, stock: true, img: "./assets/images/jabonEnPolvo.jpg", clase: "limpieza"},
    { tipo: "leche", precio: 102, stock: true, img: "./assets/images/leche.jpg", clase: "bebida"}
];

/* 
let productos = []
fetch('/assets/JSON/productos.json').then((resp) => resp.json()).then( data => { productos = data}) 
*/