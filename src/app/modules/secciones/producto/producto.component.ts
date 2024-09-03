import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import Swal from "sweetalert2"
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
//String que modificará el valor de @Input en el componente hijo
  product: string='';
//Coleccion de productos añadidos a la lista
  productosCarrusell:Producto[] = [];

  productoAnadido(producto: Producto){
    //reemplazamos el valor del product
    this.product = `${producto.nombre} :$${producto.precio}`;

    try{

       /*Agregamos la información recibida
     por el parametro de la función a la coleccion del carrusell */
     this.productosCarrusell.push(producto);
     Swal.fire({
       title: '¡Agregado con éxito!',
       text: 'Ha añadido el producto a su colección',
       icon: 'info'
     })

    }
    catch(error){ //ponemos (error) para concatenar el error
      Swal.fire({
        title: '¡Oh no!',
        text: 'Ha ocurrido un error\n'+error,
        icon: 'error'
    
      })
    }

   
    }
}
