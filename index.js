/* lista de productos */
const productos = [
    {nombre: "top", precio: 2500},
    {nombre: "remera dama", precio: 2250},
    {nombre: "remera hombre", precio: 2300},
];

let carrito = []

let seleccion = prompt("¡Hola! ¿Quieres comprar algo para tu look ateneo hoy?")

while(seleccion != "si" && seleccion != "no"){
    alert("por favor ingresa si o no")
    seleccion = prompt("¡Hola ¿Quieres comprar algo para tu look ateneo hoy?")
}

if(seleccion == "si"){
    alert("A continuación te mostramos nuestros productos para que armes tu outfit")
    let catalogoProductos = productos.map((producto) => producto.nombre + " " + "$" + producto.precio);
    alert(catalogoProductos.join(" - "))
} 
else if (seleccion == "no"){
    alert("¡Gracias por venir, te esperamos de regreso pronto!")
}

while(seleccion != "no"){
    let producto = prompt("Agrega un producto a tu carrito")
    let precio = 0

    if(producto == "top" || producto == "remera dama" || producto == "remera hombre"){
        switch(producto) {
            case "top":
            precio = 2500
            break;
            case "remera dama":
            precio = 2250
            break;
            case "remera hombre":
            precio = 2300
            break;
        default:
            break;
        }
    let unidades = parseInt(prompt("¿Cuántas unidades deseas llevar?"))
    carrito.push({producto, unidades, precio})
    console.log(carrito)
    } else {
        alert("No tenemos el producto que nos indicaste")
    }

    seleccion = prompt("¿Deseas elegir más productos?")
    while(seleccion == "no"){
        alert("Gracias por tu compra, ¡que lo disfrutes!")
        carrito.forEach((carritoFinal) => {
            console.log(`producto: ${carritoFinal.producto}, unidades: ${carritoFinal.unidades}, total a pagar ${carritoFinal.unidades * carritoFinal.precio}`)
        }) 
    break;
    }
}

const total = carrito.reduce((ecc, el) => acc + el.precio * el.unidades, 0)
console.log(`El total a pagar por tu compra es: ${total}`)