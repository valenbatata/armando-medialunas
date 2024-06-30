import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './pages/inicio/inicio.component';

//ANGULAR imports
import {MatGridListModule} from '@angular/material/grid-list';

export interface Tile {
  cols: number;
  rows: number;
  img: string;
}

@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
   //angular
    MatGridListModule
  
  ]
})



export class InicioModule { 
  tiles: Tile[] = [
    { cols: 3, rows: 1, img:"../../../../../assets/backgroung inicio 1.png"},
     
   
  ];
}
