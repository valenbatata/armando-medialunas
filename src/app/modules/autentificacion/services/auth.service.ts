import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from '../../shared/services/firestore.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //Referenciar Auth de Firebase al servicio
  constructor(public auth: AngularFireAuth,
    private servicioFirestore:AngularFirestore)
     { }

  //Función registro
  registrar(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  //FUnción para inicio sesión
  InicioSesion(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }
  //Función para cerrar sesión
  CerrarSesion() {
    //Devuelve una promesa vacia -> quita token
    return this.auth.signOut();
  }

  //Función para tomar el UID
  async obtenerUid() {
    //nos va a generar una promesa y la constante la va a capturar
    const user = await this.auth.currentUser


    //si el usuario no respeta la estructura de la interfaz
    //si tuvo problemas para el registro -> ej: mal internet
    if (user == null) {
      return null
    } else {
      return user.uid
    }
  }

  obtenerUsuario(gmail:string){
    /*retornamos del servicioFirestore la coleccion de 'usuario', buscamos la referencia en los gmails 
    registrados y los comparamos con los que ingrese el usuario al iniciar sesion y lo obtiene con el '.get()'
    lo vuelve una promesa => da un resultado RESUELTO o RECHAZADO */
  return this.servicioFirestore.collection('usuario', ref=>ref.where ('gmail','==', gmail)).get().toPromise()
  }
}
