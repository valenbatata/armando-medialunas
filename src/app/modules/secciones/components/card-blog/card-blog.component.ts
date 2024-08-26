import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from 'src/app/modules/admin/services/crud.service';
@Component({
  selector: 'app-card-blog',
  templateUrl: './card-blog.component.html',
  styleUrls: ['./card-blog.component.css']
})
export class CardBlogComponent {

  coleccionProductos: Producto[] = []
  coleccionBlog: Producto[] = []
  productoSeleccionado!: Producto
  modalVisible: boolean = false
  constructor(public servicioCrud: CrudService) { }

  ngOnInit(): void {
    this.servicioCrud.obtenerProductos().subscribe(producto => {
      this.coleccionProductos = producto
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
