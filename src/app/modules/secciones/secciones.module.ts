import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeccionesRoutingModule } from './secciones-routing.module';
import { ContactoComponent } from './contacto/contacto.component';
import { PortafolioComponent } from './portafolio/portafolio.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { CardComponent } from './components/card/card.component';
import { ProductoComponent } from './producto/producto.component';
import { CardPortafolioComponent } from './components/card-portafolio/card-portafolio.component';


@NgModule({
  declarations: [
    ContactoComponent,
    PortafolioComponent,
    ServiciosComponent,
    CardComponent,
    ProductoComponent,
    CardPortafolioComponent
  ],
  imports: [
    CommonModule,
    SeccionesRoutingModule,
    

  ],

})
export class SeccionesModule { }
