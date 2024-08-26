import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Ruta padre -> módulo raíz
import { AppRoutingModule } from './app-routing.module';
//Archivo componente GENERAL
import { AppComponent } from './app.component';

//Componentes GLOBALES
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';


//import de las herramientas de la base de datos
import { enviroment } from 'src/enviroment/enviroment'; //Vincula BD con la app
import{ AngularFireModule } from '@angular/fire/compat'; //Trabaja con las colecciones de información
import{ AngularFireAuthModule } from '@angular/fire/compat/auth'; //Trabaja con la autentificación
import{ AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FooterComponent } from './modules/shared/component/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    
    
    //vincula con Firebase
    AngularFireModule.initializeApp(enviroment.firebaseConfig), //inicializar Firebase dentro del proyecto
    AngularFireAuthModule,
    AngularFireStorageModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
