import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './pages/inicio/inicio.component';

//ANGULAR imports
import { MatGridListModule } from '@angular/material/grid-list';
//ANGULAR card
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    Component,
    InicioComponent,

  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    //angular
    MatGridListModule,
    MatButtonModule,
    MatCardModule
  ],
  exports: [
    InicioComponent,
    MatGridListModule,
    MatButtonModule,
    MatCardModule
  ]
})



export class InicioModule {

}
