import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private productoCollection:AngularFirestoreCollection<Producto>

  constructor(private dataBase:AngularFirestore) { 
    this.productoCollection=dataBase.collection('producto')
  }
    //Crea nuevos productos
    crearProducto(producto: Producto){
      return new Promise(async(resolve,reject) => {
        try{
          //Creamos un número identificativo para el producto en la base de datos
          const idProducto = this.dataBase.createId()
          //Asignamos ID creado al atributo idProducto de la interfaz Producto
          producto.idProducto

          const resultado=await this.productoCollection.doc(idProducto).set(producto)
        } catch (error) {reject(error)}
        
      })
    }
    //Edita productos
    //Elimina productos
    //Obtiene productos
  }
