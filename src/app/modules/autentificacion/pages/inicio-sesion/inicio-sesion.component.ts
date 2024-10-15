import { Component } from '@angular/core';
//Servicios de autentificacion
import { AuthService } from '../../services/auth.service';

//Servicio Firestore
import { FirestoreService } from 'src/app/modules/shared/services/firestore.service';

//Componentes rutas Angular
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';

import { Usuario } from 'src/app/models/usuario';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  hide = true

  //Propiedad del tipo Array
  usuarios: Usuario = {
    uid: '',
    nombre: '',
    apellido: '',
    gmail: '',
    rol: '',
    password: ''
  }

  public info: Usuario[] = []
  constructor(
    public ServicioAuth: AuthService,
    public ServicioRutas: Router,
    public servicioFirestore: FirestoreService
  ) { }

  async iniciarSesion() {

    const credenciales = {
      gmail: this.usuarios.gmail,
      password: this.usuarios.password
    }

    try {
      //obtenemos usuario de la BD
      const usuarioBD = await this.ServicioAuth.obtenerUsuario(credenciales.gmail)
      // Condicional verificada que ese usuario de la BD existiera o que sea igual al de nuestra colección
      if (!usuarioBD || usuarioBD.empty) {
        Swal.fire({
          title: "¡Oh no!",
          text: "Correo electrónico no registrado",
          icon: "error"
        });

        this.limpiarInputs();
        return;
      }
      //vincula al primerdocumento de la coleccion "usuarios" que se obtenía desde la BD
      const usuarioDoc = usuarioBD.docs[0];


      //Se extrae los datos del documento en forma de objeto y se especifica que va a ser del tipo usuario
      //Se refiere a la interfaz usuario de nuestros modelos
      const usuarioData = usuarioDoc.data() as Usuario;

      //Encriptar la contraseña que el usuario envia mediante "iniciar sesion"
      const hashedPassword = CryptoJS.SHA256(credenciales.password).toString()

      //Condicional que compara la contraseña que acabamos de encriptar y que el usuario
      //Envio con la que recivimos de "usuarioData"
      if (hashedPassword !== usuarioData.password) {
        Swal.fire({
          title: "¡Oh no!",
          text: "Contraseña incorrecta",
          icon: "error"
        });

        this.usuarios.password = '';
        return;

      }


      const res = await this.ServicioAuth.InicioSesion(credenciales.gmail, credenciales.password)
        .then(res => {
          Swal.fire({
            title: "¡Buen trabajo!",
            text: "¡Se pudo ingresar con éxito :)!",
            icon: "success"
          });

          this.ServicioAuth.setUserRol(usuarioData.rol)

          if (usuarioData.rol==="admin") {

            console.log("inicio de administrador")
            //Si es admin, redirecciona a la vista "admin"
            this.ServicioRutas.navigate(['/admin'])

          } else{

            console.log("inicio de visitante")
            //Si es otro tipo de usuario, redirecciona al "inicio"
            this.ServicioRutas.navigate(['/inicio']);

          }

          
        })

        .catch(err => {
          Swal.fire({
            title: "¡Oh no!",
            text: "Hubo un problema al iniciar sesión :( " + err,
            icon: "error"
          });

          this.limpiarInputs();
        })




    } catch (error) {
      this.limpiarInputs();
    }
  }

  limpiarInputs() {
    const inputs = {
      uid: this.usuarios.uid = '',
      nombre: this.usuarios.nombre = '',
      apellido: this.usuarios.apellido = '',
      gmail: this.usuarios.gmail = '',
      rol: this.usuarios.rol = '',
      password: this.usuarios.password = ''
    }
  }
}


