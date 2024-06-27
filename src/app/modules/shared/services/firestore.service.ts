import { Injectable } from '@angular/core';
//cloud firestore --> accedemos a las colecciones
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/models/usuario';



@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  //definimos la coleción privada para que no sea accesible en toda la aplicación.
  // Lo definimos como una colección de firestore que respete la estructura de nuestra interfaz "usuario".

  private usuarioCollection: AngularFirestoreCollection<Usuario>


  constructor(private database: AngularFirestore) {
    /*usuarioCollection va a derfinir la nueva colección "usuarios" que estará en nuestra Base de Datos */
    this.usuarioCollection = database.collection<Usuario>("usuarios")


  }

  agregarusuario(usuario: Usuario, id: string) {
    /* creamos una nueva promesa junto a los metodos:
    Resolve: promesa resuelta -> funciona correctamente 
    Reject: promesa rechazada -> ocurrio una falla 
     */
    return new Promise(async (resolve, reject) => {

      //bloque TRY encapsula la logica suelta 
      try {
        usuario.uid = id
        const resultado = await this.usuarioCollection.doc(id).set(usuario)

        resolve(resultado)
      }

      catch (error){
        reject (error)
      }



      /*
      Const resultado = colección de usuarios, envia como número de documento en el uid 
      y setea la información que ingresamos en el formulario registro */

      
      }

     
    )



  }
  
}
