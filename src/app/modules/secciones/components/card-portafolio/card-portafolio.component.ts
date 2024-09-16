import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from 'src/app/modules/admin/services/crud.service';
@Component({
  selector: 'app-card-portafolio',
  templateUrl: './card-portafolio.component.html',
  styleUrls: ['./card-portafolio.component.css']
})
export class CardPortafolioComponent {
  
  //colección de todos los productos de forma local
  coleccionProductos: Producto[] = []

  //coleccion de productos de una sola categoria
  coleccionBlog: Producto[] = []

  //variable para seleccionar productos especificos 
  productoSeleccionado!: Producto

  //variable para manejar el estado del modal
  modalVisible: boolean = false

  //patentamos de forma local el servicio para acceder en el 
  constructor(public servicioCrud: CrudService) { }

  //inicializa al momento que renderiza el componente
  ngOnInit(): void {
    //accedemos al metodo de "obtenerProducto" y nos suscribimos a los cambios
    //recibimos notificacion ante modificaciones
    this.servicioCrud.obtenerProductos().subscribe(producto => {
      this.coleccionProductos = producto

      //mostrará la colección de esa categoria hasta el momento
      this.mostrarProductoBlog()
    })
  }
  mostrarProductoBlog() {
    this.coleccionProductos.forEach(producto => {
      if (producto.categoria === "blog") {
        this.coleccionBlog
      }
    })
  }
  mostrarVer(info: Producto) {
    this.modalVisible = true;
    this.productoSeleccionado = info;
  }

}
