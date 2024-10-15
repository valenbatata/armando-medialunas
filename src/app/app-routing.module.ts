import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './modules/inicio/pages/inicio/inicio.component';

//Guardián para la vista administrador
import { rutaProtegidaGuard } from './guards/ruta-protegida.guard';

const routes: Routes = [
//ruta por defoult que se muestra en la inicialización
{
  path:"", component:InicioComponent
},

  // ruta que nos vincula al módulo de inicio y su contenido
  //loadChildren: Indica que habrá una ruta hija
  //.then:Función asincronica tipo PROMESA 
  {
    path:"",loadChildren:()=>import('./modules/inicio/inicio.module').then(m=>m.InicioModule)

  },
  {
    path:"",loadChildren:()=>import('./modules/secciones/secciones.module').then(m=>m.SeccionesModule) 
  },
  {
    path:"",loadChildren:()=>import('./modules/autentificacion/autentificacion.module').then(m=>m.AutentificacionModule) 
  },
  {
    path:"",loadChildren:()=>import('./modules/admin/admin.module').then(m=>m.AdminModule),
    
    //Definirle al guardián que proteja la ruta Admin y que espere un rol de tipo "admin"
    canActivate:[rutaProtegidaGuard],data:{ role:'admin' } 

  }


 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
