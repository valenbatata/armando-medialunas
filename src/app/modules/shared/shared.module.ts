import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//importación de componentes globales
import { NavbarComponent } from './component/navbar/navbar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

//Angular components
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';


//imports de menú
import {MatMenuModule} from '@angular/material/menu';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  
  imports: [
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule
  ],

  exports:[
  
    NavbarComponent,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule
  ]
})
export class SharedModule { }
