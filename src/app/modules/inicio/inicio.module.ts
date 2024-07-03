import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './pages/inicio/inicio.component';

//ANGULAR imports
import {MatGridListModule} from '@angular/material/grid-list';
//ANGULAR card
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


export interface Tile {

}

@NgModule({
  
 

  declarations: [
    InicioComponent
   
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
   //angular
    MatGridListModule, 
    Component,
    MatButtonModule,
    MatCardModule
  
  ]
})



export class InicioModule { 

}
