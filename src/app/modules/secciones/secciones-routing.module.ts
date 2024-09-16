import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortafolioComponent } from './portafolio/portafolio.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ProductoComponent } from './producto/producto.component';

const routes: Routes = [

  {
    path:"portafolio",component:PortafolioComponent

  },
  {
    path:"servicios",component:ServiciosComponent

  },
  {
    path:"contacto",component:ContactoComponent

  },
  {
    path:"producto",component:ProductoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeccionesRoutingModule {

 }
