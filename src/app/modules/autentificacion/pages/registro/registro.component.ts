import { Component } from '@angular/core';
//Importamos servicio de autentificación
import { AuthService } from '../../services/auth.service';
//Importamos componentes de rutas de Angular
import { Router } from '@angular/router';

import { FirestoreService } from 'src/app/modules/shared/services/firestore.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
 //import de la contraseña para ver los carácteres o no 
 hide = true;
  
  
 //importar la interfaz de usuario -> INICIALIZAR
 usuario:Usuario={
   uid:"", //-> iniciamos con comillas simples porque es string
   nombre:"",
   apellido:"",
   gmail:"",
   rol:"",
   password:""
 }

 //CREAMOS COLECCIÓN DE USUARIOS, TIPO "USUARIO" PARA ARRAYS

 coleccionusuarios: Usuario[]=[]

 constructor(
   public ServicioAuth:AuthService,
   public ServicioRutas:Router,
   public servicioFirestore:FirestoreService
 ){}

 //función para registro de nuevos usuarios
 async registrar(){

   const credenciales={
     email:this.usuario.gmail,
     password:this.usuario.password
   }

   const respuesta=await this.ServicioAuth.registrar(credenciales.email, credenciales.password)
   //el .then es una promesa que devuelve el mismo valor si todo sale bien
   .then (respuesta=>{
     alert("¡Se pudo registrar con éxito")

     //El metodo NAVIGATE nos redirecciona a otra vista
     this.ServicioRutas.navigate(['/inicio'])
   } )

   //El metodo CATCH captura una falla u la vuelve un error
   .catch(error=>{
     alert("Hubo un problema al registrar un nuevo usuario (\n"+error)
   })
    
   
  


   }

   async guardarusuario(){
     this.servicioFirestore.agregarusuario(this.usuario, this.usuario.uid)
     .then(res=> {
       console.log(this.usuario);
     })
     .catch(err=>{
       console.log('Error =>',err);
     })
     //Constante UID captura el identificador de la BD
     const uid=await this.ServicioAuth.obtenerUid()
     //Se le asigna al atributo de la interfaz esta constante
     this.usuario.uid=uid
     //Llamamos a la función guardarusuario()
     this.guardarusuario()
     //Llamamos a la función limpiarInputs()
     this.limpiarInputs()

   }
   limpiarInputs(){
     const inputs ={
       uid: this.usuario.uid = '',
       nombre: this.usuario.nombre = '',
       apellido: this.usuario.apellido = '',
       gmail:this.usuario.gmail = '',
       rol:this.usuario.rol = '',
       password:this.usuario.password = ''
     }
   }
 }




