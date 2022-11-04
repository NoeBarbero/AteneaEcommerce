let stockProductos = [
    {id: 1, nombre: "Peeling", tipo: "Peeling", cantidad: 1, desc: "Exfoliación de las capas más superficiales de la piel para favorecer su sustitución por otras de mejor calidad y textura. Se induce así la creación de nuevas capas de la dermis y la epidermis.", precio: 2200, img: './img/rostro_flores.webp'},
    {id: 2, nombre: "Limpieza facial con aparatología", tipo: "Limpieza", cantidad: 1, desc: "Limpieza profunda con hidratación en la que se utiliza la radiofrecuencia facial más avanzada. Se aplican tres exfoliantes distintos, un serum, una mascarilla y se finaliza con un crema facial.", precio: 2500, img: './img/limpiezafacial_aparato.webp'},
    {id: 3, nombre: "Radiofrecuencia", tipo: "Aparatologia", cantidad: 1, desc: "Técnica de medicina estética dirigida a tratar la laxitud de la piel, produce un efecto similar al lifting pero sin cirugía. Es un procedimiento adecuado para pacientes con flacidez leve o moderada de los tejidos faciales.", precio: 2100, img: './img/radiofrec.jpg'},
    {id: 4, nombre: "Microdermoabrasion", tipo: "Peeling", cantidad: 1, desc: "Tratamiento de medicina estética que consiste en aplicar unos granos diminutos que consiguen exfoliar y eliminar las células muertas de la piel. Esto hace que la piel se renueve y aparezca una nueva más bella, cuidada y saneada.", precio: 2500, img: './img/microdermoabrasion.jpg'},
    {id: 5, nombre: "Masajes reductores", tipo: "Masajes", cantidad: 1, desc: "Método para combatir y eliminar la acumulación de grasa de una zona localizada del cuerpo, como glúteos o abdomen. Además, favorece la expulsión de toxinas, beneficia el flujo sanguíneo y mejora el sistema digesitvo, entre otras ventajas.", precio: 3200, img: './img/masajesreductores.jpg'},
    {id: 6, nombre: "Lifting de pestañas", tipo: "Pestañas", cantidad: 1, desc: "Tratamiento que alarga y crea una ligera curva hacia arriba de manera natural y duradera, consiguiendo mayor longitud y espesor.", precio: 3500, img: './img/lifting_pesta.webp'},
    {id: 7, nombre: "Limpieza facial profunda", tipo: "Limpieza", cantidad: 1, desc: "Oxigena tu piel, retrasa la aparición de arrugas, piel más luminosa, elimina y previene el acné y los puntos negros", precio: 2100, img: './img/limpieza_facial.webp'},
];


const contenedorProductos = document.getElementById('contenedor-productos')


const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const botonPagar = document.getElementById('pagar-carrito')

const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})
botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
    Swal.fire('Carrito vaciado') /* libreria usada para dar confirmación del vaciado del carrito */

})
botonPagar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
    Swal.fire('Gracias por tu compra! Realizá tu transferencia al alias Atenea.Belleza y envia el comprobante al 03492 15606060, te responderemos de 8 a 16hs para coordinar tu turno!') /* libreria usada para pago del carrito */

})

//INYECTO HTML
stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `
    contenedorProductos.appendChild(div)

    const boton = document.getElementById(`agregar${producto.id}`)


    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })
})


const agregarAlCarrito = (prodId) => {

    const existe = carrito.some (prod => prod.id === prodId)

    if (existe){
        const prod = carrito.map (prod => { 
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else {
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    
    actualizarCarrito() 
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item) 
    carrito.splice(indice, 1) 
    actualizarCarrito()
    console.log(carrito)
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "" 
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
    })

    localStorage.setItem('carrito', JSON.stringify(carrito))

    contadorCarrito.innerText = carrito.length
    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)

}

/* Fetch */
let container = document.getElementById("container");

const url = 'https://jsonplaceholder.typicode.com/users'

fetch(url)
    .then(res => res.json())
    .then(data => {
        data.forEach(usuario => {
            const p = document.createElement('p')
            p.innerHTML = usuario.name
            container.appendChild(p)
        });
    })
    .catch(err => console.log(err))
