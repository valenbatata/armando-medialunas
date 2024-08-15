import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../services/crud.service';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  //Creamos coleccion local de producto -> la definimos como array
  coleccionProductos: Producto[] = []
  productoSeleccionado!: Producto; // ! <- toma valores vacios
  modalVisibleProducto: boolean = false;


  //definimos formulario para los prductos 
  /*
  Los atrivutos alfa numericos (string) se inicializan con comillas simples
  Atributos numericos (number) se inicializan con cero (0) */
  producto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    alt: new FormControl('', Validators.required)
  })

  constructor(public servicioCrud: CrudService) { }

  ngOnInit(): void {
    this.servicioCrud.obtenerProductos().subscribe(producto => {
      this.coleccionProductos = producto
    })
  }


  async agregarProducto() {
    if (this.producto.valid) {
      let nuevoProducto: Producto = {
        idProducto: '',
        nombre: this.producto.value.nombre!,
        precio: this.producto.value.precio!,
        imagen: this.producto.value.imagen!,
        alt: this.producto.value.alt!,
        descripcion: this.producto.value.descripcion!,
        categoria: this.producto.value.categoria!


      }
      await this.servicioCrud.crearProducto(nuevoProducto)
        .then(producto => {
          alert("ha ingresado un nuevo producto con exito")
        })
        .catch(error => {
          alert("ha ocurrido un error al agregar el nuevo producto"+error)
        })
    }
  }



  // función vinculada al modal y el botón de la tabla
  mostrarBorrar(productoSeleccionado: Producto) {
    this.modalVisibleProducto = true;
    this.productoSeleccionado = productoSeleccionado;
  }

  borrarProducto() {
    this.servicioCrud.eliminarProducto(this.productoSeleccionado.idProducto)
    .then(respuesta=>{
      alert("se ha podido eliminar con éxito")
    })
    .catch(error => {
      alert("Ha ocurrido un error al eliminar el producto"+error)
    })      
    }
  }

