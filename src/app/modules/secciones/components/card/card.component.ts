import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from 'src/app/modules/admin/services/crud.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  //Definimos la coleccion productos locales
coleccionProductos:Producto[]=[]

//Variable local para seleccionar un producto especifico
productoSeleccionado!:Producto

//Variable local para manejar estado de un modal
modalVisible:boolean=false


constructor(public servicioCrud:CrudService){
  this.servicioCrud.obtenerProductos().subscribe(producto=>{
    this.coleccionProductos=producto
  })
}

ngOnInit():void{
  this.servicioCrud.obtenerProductos().subscribe(producto=>{
    this.coleccionProductos=producto
  })
}


//Funcion para mostrar más informacion de los productos
mostrarVer(info:Producto){

  //Cambio estado del modal a true (ahora es visible)
  this.modalVisible=true;

  //Guardo en variable seleccionando la informacion del producto elegido
  this.productoSeleccionado=info
}
}
