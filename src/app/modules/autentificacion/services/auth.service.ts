import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //Referenciar Auth de Firebase al servicio
  constructor(public auth: AngularFireAuth) { }

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
}
