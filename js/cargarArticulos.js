const misCompania = document.getElementById('misCategorias');
const misProductos = document.querySelector('#misProductos');
const txtBuscar = document.getElementById('txtBuscar');


/* barra nav*/
function mostrarEmpresa() {
    let ListaEmp = [ 'favoritos',...new Set(products.map((prod) => prod.company))];
    misCompania.innerHTML = '';

    // let temp = [];
    // products.forEach((elem) => {
    //     if (!temp.includes(elem.company))
    //         temp.push(elem.company)
    // });

    misCompania.innerHTML = ListaEmp.map((emp) => { 
        return `<button class="empresa-btn validar" data-id="${emp}" onclick="mostrarProductos(event)">${emp}</button>`;
    }).join('');
}

mostrarEmpresa();


/*cargar articulos*/
function mostrarProductos(ev){
    misProductos.innerHTML = '';

    if(ev != undefined) {
        if (ev.currentTarget.dataset.id != "favoritos")
        {
            misProductos.innerHTML = products.filter(x => x.company == ev.currentTarget.dataset.id).map((proc) => {
                return `<article id="articulo" class="product" data-id="${proc.id}" >
                <img src="${proc.image}" class="product-img img" alt="">
                <footer>
                <h5 class="product-name">${proc.title}</h5>
                <span class="product-price d-flex justify-content-center mt-2 ">${proc.price}$
                <button id="${proc.id}" onclick="mostrar(${proc.id})" class="button-modal"  data-open="modal">
                 <i  class="fa-solid fa-cart-shopping text-dark ms-3 "></i>
                </button>
                </span>
                </footer>
            </article> `
            }).join('');
            
            return;
        }
    } 

    misProductos.innerHTML = products.map((proc) => {
        if(proc.company==''){
            return `<article id="articulo" class="product" data-id="${proc.id}" >
            <img src="${proc.image}" class="product-img img" alt="">
            <footer>
            <h5 class="product-name">${proc.title}</h5>
            <span class="product-price d-flex justify-content-center mt-2 ">${proc.price}$
            <button id="${proc.id}" onclick="mostrar(${proc.id})" class="button-modal"  data-open="modal">
             <i  class="fa-solid fa-cart-shopping text-dark ms-3 "></i>
            </button>
            </span>
            </footer>
        </article> `
}}).join('');
    return;
    }
mostrarProductos();

/*cargar articulos por buscador*/
txtBuscar.addEventListener('keyup', (ev) => {
    misProductos.innerHTML = '';
    misProductos.innerHTML = products.filter(x => x.title.toLowerCase().includes(ev.currentTarget.value.toLowerCase())).map((proc) => {
        return `<article id="articulo" class="product" data-id="${proc.id}" >
        <img src="${proc.image}" class="product-img img" alt="">
        <footer>
        <h5 class="product-name">${proc.title}</h5>
        <span class="product-price d-flex justify-content-center mt-2 ">${proc.price}$
        <button id="${proc.id}" onclick="mostrar()"  class="button-modal"  data-open="modal">
         <i  class="fa-solid fa-cart-shopping text-dark ms-3 "></i>
        </button>
        </span>
        </footer>
    </article> `
    }).join('');
    
    return;
});

/*modal*/


const openModal=document.querySelectorAll('[data-open]');
const closeModal=document.querySelectorAll('[data-close]');
const modalId=document.getElementById('modal');
const esVisible= "es-visible";

for (const el of openModal){
   el.addEventListener('click', function(){
    const openM=this.dataset.open;
    document.getElementById(openM).classList.add(esVisible);
    mostrarArticulo(this.id);
   })
}



for (const el of closeModal) {
    el.addEventListener('click', function(){
 if(modalId.matches('.es-visible')){
    modalId.classList.remove(esVisible);
 }
        this.parentElement.parentElement.classList.remove(esVisible);

    });
}

//mostrar datos en la tabla
function mostrarArticulo(id){
let total = 0;
const agregarElemento=document.getElementById('agregarElemento');
agregarElemento.innerHTML='';
// let producto =   products.find(x => x.id == id)
$.each(products,function(ind,valor,arr){
    if(valor.id==id){
        agregarElemento.innerHTML=`
        <div class="d-flex">
        <img src="${valor.image}" class="w-100" alt="" />
        <div>
          <nav class="nav ps-5">
            <ul
              class="text-white p-2 list-unstyled d-flex justify-content-end align-item-end"
            >
              <li class="nav-item">
                <a
                  class="nav-link text-dark"
                  aria-current="page"
                  href="index.html"
                  >Home</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link text-dark" href="#">Contacto</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-dark" href="#">Locales</a>
              </li>
            </ul>
          </nav>
          <div>
            <div>
              <h2 class="titulo ps-4">${valor.title}</h2>
            </div>
            <form
              class="d-flex justify-content-center align-item-center mt-4"
              action=""
            >
            <input title="ingresa la cantidad que quieres llevar" type="number" onkeyup="teclado()" name="cantidad" id="cantidad" min="1" placeholder="cantidad" value="1" max="10" />

              <div class="ps-2" >
              <label id="agregar"> 
              ${valor.price}
              </label>
              $
              <input type="hidden" id="precio" value="${valor.price}" />
              </div>
            </form>
            <div class="mt-5 contenido-final">
              <button onclick="AgregarAlCarrito(${valor.id})" class="btn btn-dark">
                  agregar al carrito
              </button>
              <i class="fa-solid fa-cart-shopping text-dark ms-3">
              <a   href="./carrito.html?IdProducto=${valor.id}">Ir al carrito</a>
              </i>
            </div>
          </div>
        </div>
        </div>
        `;
    }
})

}

//cargarModal
function mostrar(id){
    const modalId=document.getElementById('modal');
    modalId.classList.add('es-visible');
    mostrarArticulo(id);
}
function cerrar(){
    const modalId=document.getElementById('modal');
    if (  modalId.matches('.es-visible')) {
        modalId.classList.remove('es-visible');
    }
}


//agregar al carrito 
let carrito=[];
let precioFinal;
let contador=carrito.length
let total=0;




function teclado(){
  let cantidad=document.getElementById('cantidad').value;
  let precio=document.getElementById('precio').value;
  let agregar=document.getElementById('agregar');
  precio=document.getElementById('precio').value;
  precioFinal=precio*cantidad;
  total=precioFinal
  agregar.innerHTML=`
      ${precioFinal}
  `
}







function AgregarAlCarrito(id)
{ 
  let cantidad=document.getElementById('cantidad').value;
  let precioF=document.getElementById('agregar').innerHTML;
  let arrayactual=products.find(x=>x.id==id);
  carrito.push({id:arrayactual.id,title:arrayactual.title,company:arrayactual.company,
  image:arrayactual.image,price:arrayactual.price,cantidad:cantidad,precioFinal:precioF,total:total});
  GuardarenPc(carrito);
  alert("agregado al carrito")
  mostrarN(carrito.length);
}
let c=0;
function mostrarN(contador){
  let notificacion=document.getElementById('mostrarNotificacion');
  notificacion.innerHTML='';
  console.log(contador);
  notificacion.append(`
  ${contador}
  `)
}

window.onload=function(){
  $.each(carrito, function(ind,valor,arr){
   c=c+1;
  })
this.mostrarN(c)
}


/*------------------------------------------------------------------*/
//                      GUARDAR EN LOCALSTORAGE
/*------------------------------------------------------------------*/

function GuardarenPc(carrito)
{
    if(!window.localStorage.key('wCarritoCompra'))
    {
        window.localStorage.setItem('wCarritoCompra', JSON.stringify(carrito));
    }
    else
    {
        window.localStorage.setItem('wCarritoCompra', JSON.stringify(carrito));
    }
}

function MostrarenPc()
{
        if(window.localStorage.getItem('wCarritoCompra') == null){
            window.localStorage.setItem('wCarritoCompra', JSON.stringify(carrito));
        }
        if(window.localStorage.key('wCarritoCompra'))
        {
            carrito = JSON.parse(window.localStorage.getItem('wCarritoCompra'));
        }
}

MostrarenPc();
