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

  nombreImagen!:string; //Obtendrá el nombre de la imagen

  imagen!: string //Obrentendrá la ruta de la imagen


  //definimos formulario para los prductos 
  /*
  Los atrivutos alfa-numericos (string) se inicializan con comillas simples
  Atributos numericos (number) se inicializan con cero (0) */
  producto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
  
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
        imagen:'',
        alt: this.producto.value.alt!,
        descripcion: this.producto.value.descripcion!,
        categoria: this.producto.value.categoria!
      }

      // Enviamos nombre y URL de la imagen, definimos carpeta de la imagenes como "producto"
      await this.servicioCrud.subirImagen(this.nombreImagen, this.imagen, "producto")
      .then(resp => {
        //encapsulamos la respuesta y enviamos la información obtenida
        this.servicioCrud.obtenerUrlImagen(resp)

        .then(url => {
          this.servicioCrud.crearProducto(nuevoProducto, url)
          // Ahora método crearProducto recibe datos del formulario y URL creada
        .then(producto => {

          alert("ha ingresado un nuevo producto con exito")

          //resetea el formulario y las casillas quedan vacías
          this.producto.reset();

        })
        .catch(error => {

          alert("ha ocurrido un error al agregar el nuevo producto"+error)
          
          this.producto.reset();
        })
        })
      })
    }
  }

  cargarImagen(event: any){
    // Variable para obtener el articulo subido donde el input del HTML
    let archivo = event.target.files[0];

    // Variable para crear un nuevo objeto de tipo "archivo" o "file" y leerlo
    let reader = new FileReader();

    if(archivo!= undefined){

      /*Llamamos a método readAsDataUrl para leer toda la información recibida"
      Envíamos como párametro al "archivo" porque será el encargado de tener la 
      info ingresada por el usuario
      */
      reader.readAsDataURL(archivo);

      // Definimos que haremos con la informacion mediante la funcion flecha
      reader.onloadend=()=>{}

      let url=reader.result

      if (url!= null) {
        // Definimos nombre de la imagen con atributo "name" del input
        this.nombreImagen = archivo.name
        // Definimos ruta de la imagen según url recibida
        this.imagen = url.toString()
      }
    }
  }



  // función vinculada al modal y el botón de la tabla
  mostrarBorrar(productoSeleccionado: Producto) {
    this.modalVisibleProducto = true;
    this.productoSeleccionado = productoSeleccionado;
  }

  borrarProducto() {

    /*Ahora debemos enviar tanto el ID del producto (para identificarlo en Firestore)
     y la url de la imagen (para identificarlo en Storage)
     ID y URL <- identificadores propios de cada archivo en la Base de Datos
     */

    this.servicioCrud.eliminarProducto(this.productoSeleccionado.idProducto, this.productoSeleccionado.imagen)
    .then(respuesta=>{
      alert("se ha podido eliminar con éxito")
    })
    .catch(error => {
      alert("Ha ocurrido un error al eliminar el producto"+error)
    })      
    }

    /*
    Toma los valores del producto seleccionado y 
    los va a autocompletar en el formulario del modal 
    (Menos el ID y la URL de la imagen) */

    mostrarEditar(productoSeleccionado:Producto){
      this.productoSeleccionado=productoSeleccionado
      this.producto.setValue({
        nombre:productoSeleccionado.nombre,
        precio:productoSeleccionado.precio,
        descripcion:productoSeleccionado.descripcion,
        categoria:productoSeleccionado.categoria,
        alt:productoSeleccionado.alt
      })
    }
    //VINCULA AL BOTÓN "editarProducto" DEL MODAL DE EDITAR
    editarProducto(){
      let datos:Producto={

        //SOLO idProducto PORQUE SE MODIFICA POR EL USUARIO
        idProducto:this.productoSeleccionado.idProducto,
        nombre:this.producto.value.nombre!,
        precio:this.producto.value.precio!,
        descripcion:this.producto.value.descripcion!,
        categoria: this.producto.value.categoria!,
        imagen:this.productoSeleccionado.imagen,
        alt: this.producto.value.alt!

      }
      //Vamos a verificar si el usuario ingresa o no una nueva imagen
      if (this.imagen) {
        this.servicioCrud.subirImagen(this.nombreImagen, this.imagen, "productos")
        .then(resp => {
          this.servicioCrud.obtenerUrlImagen(resp)
          .then(url =>{
            datos.imagen = url; //Actualizamos el URL de la imagen en los datos del formulario

            this.actualizarProducto(datos); //Actualizar datos

            this.producto.reset(); //Vaciar las casillas del formulario
          })
          .catch(error =>{
            alert("Hubo un problema al subir la imagen :( \n"+error);

            this.producto.reset();
          })
        })

      }
      else{
        /*Actualizamos el formulario con los datos recibidos del usuario, pero sin
         modificar la imagen ya existente en Firestore y en Storage */

        this.actualizarProducto(datos);

      }
    }

    //Actualizar la información ya existente de los productos
    actualizarProducto(datos: Producto){
      
      //Enviamos al método ID del producto seleccionado y los datos actualizados
      this.servicioCrud.modificarProducto(this.productoSeleccionado.idProducto,datos)

      .then(producto=>{
        alert("El producto se ha modificado con éxito")
        this.producto.reset();
      })
      .catch(error=>{
        alert("hubo un error al modificar el producto:\n"+error)
        this.producto.reset();
      })
    }
  }

