import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/autentificacion/services/auth.service';
import { Router } from '@angular/router';

@Component({

  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
 logeado=true //booleana para manejar el registro y el inicio sesión
  deslogeado=false //booleana para manejar el cerrar sesión
constructor(
  public servicioAuth:AuthService,
public servicioRutas:Router
){}

inicio(){
  this.logeado=false
  this.deslogeado=true
}
cerrarSesion(){
  this.deslogeado=false
  this.logeado=true
  this.servicioAuth.CerrarSesion
  this.servicioRutas.navigate(['/'])
}
}
