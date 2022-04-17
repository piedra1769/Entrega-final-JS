const carrito = document.getElementById("carrito");
const viajes = document.getElementById("lista-viajes");
const listaViajes = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

cargarEventListeners();

function cargarEventListeners() {
  viajes.addEventListener("click", comprarDestino);
  carrito.addEventListener("click", eliminarDestino);
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
  document.addEventListener("DOMContentLoaded", leerLocalStorage);
}

function comprarDestino(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const destino = e.target.parentElement.parentElement;
        leerDatosDestino(destino);
    }
}

function leerDatosDestino(destino){
    const infoDestino = {
        imagen: destino.querySelector('img').src,
        titulo: destino.querySelector('h4').textContent,
        precio: destino.querySelector('.precio').textContent,
        id: destino.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoDestino);
}

function insertarCarrito(destino) {
    const row = document.createElement('tr');
    row.innerHTML = `
       <td>
           <img src="${destino.imagen}" width=100> 
       </td> 
       <td>${destino.titulo}</td>
       <td>${destino.precio}</td>
       <td>
        <a href="#" class="borrar-destino" data-id="${destino.id}">X</a>
       </td>
    `;
    listaViajes.appendChild(row);
    guardarDestinoLocalStorage(destino);
}

function eliminarDestino(e) {
    e.preventDefault();

    let destino,
        destinoId;
    
    if(e.target.classList.contains('borrar-destino')) {
        e.target.parentElement.parentElement.remove();
        destino = e.target.parentElement.parentElement;
        destinoId = destino.querySelector('a').getAttribute('data-id');
    }
    eliminarDestinoLocalStorage(destinoId)
}

function vaciarCarrito(){
    while(listaViajes.firstChild){
        listaViajes.removeChild(listaViajes.firstChild);
    }
    vaciarLocalStorage();

    return false;
}

function guardarDestinoLocalStorage(destino) {
    let viajes;

    viajes = obtenerViajesLocalStorage();
    viajes.push(destino);

    localStorage.setItem('viajes', JSON.stringify(viajes));
}

function obtenerViajesLocalStorage() {
    let viajesLS;

    if(localStorage.getItem('viajes') === null) {
        viajesLS = [];
    }else {
        viajesLS = JSON.parse(localStorage.getItem('viajes'));
    }
    return viajesLS;
}

function leerLocalStorage() {
    let viajesLS;

    viajesLS = obtenerViajesLocalStorage();

    viajesLS.forEach(function(destino){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${destino.imagen}" width=100>
            </td>
            <td>${destino.titulo}</td>
            <td>${destino.precio}</td>
            <td>
                <a href="#" class="borrar-destino" data-id="${destino.id}">X</a>
            </td>
        `;
        listaViajes.appendChild(row);
    });
}

function eliminarDestinoLocalStorage(destino) {
    let viajesLS;
    viajesLS = obtenerViajesLocalStorage();

    viajesLS.forEach(function(destinoLS, index){
        if(destinoLS.id === destino) {
            viajesLS.splice(index, 1);
        }
    });

    localStorage.setItem('viajes', JSON.stringify(viajesLS));
}

function vaciarLocalStorage() {
    localStorage.clear();
}
