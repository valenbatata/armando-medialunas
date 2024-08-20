import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { PortafolioComponent } from './portafolio/portafolio.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ContactoComponent } from './contacto/contacto.component';

const routes: Routes = [
  {
    path:"blog",component:BlogComponent
  },
  {
    path:"portafolio",component:PortafolioComponent

  },
  {
    path:"servicios",component:ServiciosComponent

  },
  {
    path:"contacto",component:ContactoComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeccionesRoutingModule {

 }
