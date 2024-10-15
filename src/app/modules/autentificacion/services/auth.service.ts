import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from '../../shared/services/firestore.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private rolUsuario: string | null = null

  //Referenciar Auth de Firebase al servicio
  constructor(public auth: AngularFireAuth,
    private servicioFirestore: AngularFirestore) { }

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

  obtenerUsuario(gmail: string) {
    /*retornamos del servicioFirestore la coleccion de 'usuario', buscamos la referencia en los gmails 
    registrados y los comparamos con los que ingrese el usuario al iniciar sesion y lo obtiene con el '.get()'
    lo vuelve una promesa => da un resultado RESUELTO o RECHAZADO */
    return this.servicioFirestore.collection('usuario', ref => ref.where('gmail', '==', gmail)).get().toPromise()
  }

  //FUNCIÓN PARA OBTENER ROL
  obtenerRol(uid: string): Observable<string | null> {

    /*
    Accedemos a la colección de usuarios, buscando por UID, obteniendo cambios en valores
    Al enviar información por la tubería, "mapeamos" la colección, obtenemos un usuario específico y buscamos su atributo "rol", aún si este es "nulo"
    */
    return this.servicioFirestore.collection("usuarios").doc(uid).valueChanges().pipe(map((usuario: any) => usuario ? usuario.rol : null))
  }

  //Enviar el rol obtenido -> Asignarlo al rol de la variable local
  setUserRol(rol: string) {
    this.rolUsuario = rol;
  }

  //Obtener el rol nuevamente y retornar
  getUserRol():string|null{
    return this.rolUsuario;
  }
}
