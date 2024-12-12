const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 

let articulosCarrito = [];




cargarEventListeners();

function cargarEventListeners() {
    // Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);   

    // Muestra los cursos de LocalStorage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    });

    // Al Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

// Funciones

function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function leerDatosCurso(curso) {
    // console.log(curso);

    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }

    //revisa si un elemento ya existe en el carrito
    if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
        const cursos = articulosCarrito.map( curso => {
             if( curso.id === infoCurso.id ) {
                  curso.cantidad++;
                   return curso;
              } else {
                   return curso;
           }
        })
        articulosCarrito = [...cursos];
   }  else {
        articulosCarrito = [...articulosCarrito, infoCurso];
   }


    //agregar elementos al carrito

   
    console.log(articulosCarrito);
    carritoHTML();
}

//muestra el carrito de compras en el HTML  

function carritoHTML() {

    //limpiar el HTML
    limpiarHTML();
    //recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso=>{
        const row = document.createElement('tr');
        row.innerHTML=`
            <td>
                <img src="${curso.imagen}" width=100>
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;
        //agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

//elimina los cursos del tbody
function limpiarHTML() {
    //forma lenta
    // contenedorCarrito.innerHTML = '';
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso') ) {
         // e.target.parentElement.parentElement.remove();
         const cursoId = e.target.getAttribute('data-id')
         
         // Eliminar del arreglo del carrito
         articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

         carritoHTML();
    }
}


// Muestra el curso seleccionado en el Carrito
function carritoHTML() {

    vaciarCarrito();

    articulosCarrito.forEach(curso => {
         const row = document.createElement('tr');
         row.innerHTML = `
              <td>  
                   <img src="${curso.imagen}" width=100>
              </td>
              <td>${curso.titulo}</td>
              <td>${curso.precio}</td>
              <td>${curso.cantidad} </td>
              <td>
                   <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
              </td>
         `;
         contenedorCarrito.appendChild(row);
    });

    // Agregar el carrito de compras al Storage
    sincronizarStorage();

}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
    // forma lenta
    // contenedorCarrito.innerHTML = '';


    // forma rapida (recomendada)
    while(contenedorCarrito.firstChild) {
         contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}



