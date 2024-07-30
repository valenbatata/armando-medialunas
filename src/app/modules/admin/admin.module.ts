import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
//Componente
import { TableComponent } from './components/table/table.component';
//Vista
import { AdminComponent } from './page/admin/admin.component';
//Paquetería para formularios y formularios reactivos 
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
 import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    TableComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  exports: [
    TableComponent,
    AdminComponent,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class AdminModule { }
