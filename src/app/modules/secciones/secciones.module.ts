import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeccionesRoutingModule } from './secciones-routing.module';
import { BlogComponent } from './blog/blog.component';
import { ContactoComponent } from './contacto/contacto.component';
import { PortafolioComponent } from './portafolio/portafolio.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { CardComponent } from './components/card/card.component';
import { CardBlogComponent } from './components/card-blog/card-blog.component';
import { ProductoComponent } from './producto/producto.component';


@NgModule({
  declarations: [
    BlogComponent,
    ContactoComponent,
    PortafolioComponent,
    ServiciosComponent,
    CardComponent,
    CardBlogComponent,
    ProductoComponent
  ],
  imports: [
    CommonModule,
    SeccionesRoutingModule
  ],

})
export class SeccionesModule { }
