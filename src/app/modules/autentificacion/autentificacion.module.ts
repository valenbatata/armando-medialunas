import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


//vistas de autentificación
import { InicioSesionComponent } from './pages/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './pages/registro/registro.component';

//archivo de rutas hijas
import { AutentificacionRoutingModule } from './autentificacion-routing.module';
//componentes de material
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

//componentes de Angular
import { FormsModule } from '@angular/forms';

//select angular
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    InicioSesionComponent,
    RegistroComponent,


  ],
  imports: [
    CommonModule,
    AutentificacionRoutingModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule

  ],
  exports: [
    InicioSesionComponent,
    RegistroComponent,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule
  ]

})
export class AutentificacionModule { }
