let IdProducto = window.location.search.split('=')[1];


/*---------------------------------- */
//           LOCAL STORAGE  trae los datos 
/*---------------------------------- */

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
function mostrar(carrito){
    // localStorage.removeItem('wCarritoCompra');
    let lienzo = $('#lienzo');
    lienzo.innerHTML = '';
    $.each(carrito, function(ind, productosCarrito,arr){
       lienzo.append(`
       <tr>
       <td>
         <h3>${productosCarrito.title}</h3> 
       </td>
       <td class="text-center mob-hide">
         <a href="#!" class="trsn" title="imagen comida">
           <img src="${productosCarrito.image}" alt="ravioles" width="30px" height="30px" title="plato del dia ">
         </a>
       </td>
       <td>
       <input type="hidden" id="precio" value="${productosCarrito.price}" name="precio">
         <span class="">${productosCarrito.price}</span>$
       </td>
       <td>
       ${productosCarrito.cantidad}
       </td>
       <td>
       ${productosCarrito.precioFinal}
       </td>
       <td clas="text-right"> 
       <button class="btn" type="button" id="boton" onload="Recargar()" onclick="borrarElemento(${productosCarrito.id})" >
        <i onclick="borrarElemento(${productosCarrito.id})" class="fas fa-times-circle"></i>
        </button>
        </td>
     </tr>
       `);}
    )
}
mostrar(carrito)



function agregarT(){
    let total = 0;
    let lienzo2 = document.getElementById('agregados');
    lienzo2.innerHTML = '';
    $.each(carrito, function(ind, productosCarrito,arr){
    total=total+Number(productosCarrito.precioFinal);
    })
    total.toFixed(2);

        lienzo2.innerHTML =`        
        ${total}
      `
}


let elemento;
function borrarElemento(id){
    const lienzo=document.getElementById('lienzo');
    lienzo.innerHTML = '';
    elemento= carrito.find(x => x.id === id)
    if(carrito.includes(elemento)){
      let posicion =   carrito.indexOf(elemento);
      carrito.splice(posicion,1);    
      window.localStorage.setItem('wCarritoCompra', JSON.stringify(carrito));
        
    }
     mostrar(carrito);
     mostrarN(carrito.length);   
     agregarT()
}

agregarT()
function Recargar(){
    mostrar(carrito);
    agregarT()
}


function mostrarN(contador){
    let notificacion=document.getElementById('mostrarNotificacion');
    notificacion.innerHTML='';
    notificacion.append(`
    ${contador}
    `)
  }
  
  window.onload=mostrarN(carrito.length)