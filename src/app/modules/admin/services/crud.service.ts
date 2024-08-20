import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private productoCollection: AngularFirestoreCollection<Producto>

  constructor(private dataBase: AngularFirestore) {
    this.productoCollection = dataBase.collection('producto')
  }

  //Crea nuevos productos
  crearProducto(producto: Producto) {
    return new Promise(async (resolve, reject) => {
      try {
        //Creamos un número identificativo para el producto en la base de datos
        const idProducto = this.dataBase.createId()
        //Asignamos ID creado al atributo idProducto de la interfaz Producto
        producto.idProducto = idProducto

        const resultado = await this.productoCollection.doc(idProducto).set(producto)
        resolve(resultado)
      } catch (error) 
       { reject(error) }

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
  eliminarProducto(idProducto: string) {
    return new Promise((resolve, reject) => {
      try {
        const respuesta = this.productoCollection.doc(idProducto).delete()
        resolve(respuesta)
      } catch (error) {
        reject(error)
      }
    })
  }

    //Edita productos
    /*

    Accedemos a la colección "productos" de la base de datos, buscamos el ID del producto
    seleccionado y lo actualizamos con el medotodo "update" enviando la nueva información
      
    */
    modificarProducto(idProducto:string, nuevaData:Producto){
      return this.dataBase.collection('producto').doc(idProducto).update(nuevaData)
    }

}
