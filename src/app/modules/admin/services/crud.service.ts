import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
//Importaciones para manejo de archivos y referencias
import { getDownloadURL, getStorage, ref, UploadResult, uploadString, deleteObject } from 'firebase/storage';
/*
getDownloadURL -> es para obtener la URL de la descarga de una imagen subida 

getStorage -> Para obtener la intancia de almacenamiento

ref -> Para crear referencias a ubicaciones en el almacenamiento

UploadResult -> Tipo que representa el resultado de una operacion subida

uploadString -> Para subir imagenes en formato de cadena

deleteObject -> Para eliminar un espacio en el almacenamiento
 */
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private productoCollection: AngularFirestoreCollection<Producto>

  //Definir variable "respuesta" que podrá subir resultados
  private respuesta!: UploadResult;

  //Inicializar servicio Storage
  private storage = getStorage();

  constructor(private dataBase: AngularFirestore) {
    this.productoCollection = dataBase.collection('producto')
  }

  //Crea nuevos productos -> obtiene datos del formulario y URL de la imagen
  crearProducto(producto: Producto, url: string) {
    return new Promise(async (resolve, reject) => {
      try {
        //Creamos un número identificativo para el producto en la base de datos
        const idProducto = this.dataBase.createId()
        //Asignamos ID creado al atributo idProducto de la interfaz Producto
        producto.idProducto = idProducto;

        // Asignamos  URL recibida del parametro al atributo "imagen" del interfaz producto
        producto.imagen = url;

        const resultado = await this.productoCollection.doc(idProducto).set(producto)
        resolve(resultado)
      } catch (error) { reject(error) }

    })
  }


  /*
  
  Obtiene productos

   SNAPSHOT => toma una captura del estado de los datos
   PIPE => tuberias que retornan un nuevo arreglo
   A => resguarda la nueva información y la envia como un nuevo documento 

   */
  obtenerProductos() {
    return this.productoCollection.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())))
  }

  //Elimina productos
  eliminarProducto(idProducto: string, imagenUrl: string) {
    return new Promise((resolve, reject) => {
      try {
        //Definimos referencias localmente
        const storage = getStorage();

        //obtiene la referencia desde el almacenamiento de Storage
        const referenciaImagen = ref(storage, imagenUrl);

        deleteObject(referenciaImagen)
        .then(()=>{
          const respuesta = this.productoCollection.doc(idProducto).delete()

          resolve(respuesta)
        })

        .catch(error => {
            reject("Error al eliminar la imagen: \n"+error);
        })
      } 
      catch(error){
        reject(error)
      }
   
    })
  }

  //Edita productos
  /*

  Accedemos a la colección "productos" de la base de datos, buscamos el ID del producto
  seleccionado y lo actualizamos con el medotodo "update" enviando la nueva información
    
  */
  modificarProducto(idProducto: string, nuevaData: Producto) {
    return this.dataBase.collection('producto').doc(idProducto).update(nuevaData)
  }

  // Obtener URL de imagenes
  obtenerUrlImagen(respuesta: UploadResult) {
    // Retorna el URL obtenido como REFERENCIA
    return getDownloadURL(respuesta.ref)
  }

  /**
   * PARAMETROS OBTENIDOS
   * @param {string} nombre <- Nombre de la imagen 
   * @param {any} imagen <- Tipo de imagenes que se pueden subir (extensión)
   * @param {string} ruta <- Ruta de almacenamiento de las imágenes
   * @returns  <- Se retorna lo obtenido
   */

  //SUBIR imagenes con sus referencias
  async subirImagen(nombre: string, imagen: any, ruta: string) {
    try {
      //Creamos una referencia de imagen
      // Accede a Storage (almacenamiento), ruta (carpeta) / nombre(nombreCarpeta)
      let refenciaImagen = ref(this.storage, ruta + '/' + nombre)

      //Asignarle a la respuesta la información de las imagenes subidas
      this.respuesta = await uploadString(refenciaImagen, imagen, 'data_url')

        .then(resp => {
          return resp;
        })
      return this.respuesta;
    }
    catch (error) {
      console.log(error);

      return this.respuesta;

    }
  }

}
