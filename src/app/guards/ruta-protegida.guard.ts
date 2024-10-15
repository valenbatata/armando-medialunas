import { CanActivateFn } from '@angular/router';
import { inject, Inject } from '@angular/core';
import { AuthService } from '../modules/autentificacion/services/auth.service';
import { Router } from '@angular/router';
//Operadores tipo "observables"
import { map, switchMap, of, from } from 'rxjs'

export const rutaProtegidaGuard: CanActivateFn = (route, state) => {
  //Injectamos/instaciamos el servicio de autentificación en el guardián (forma local)
  const ServicioAuth = inject(AuthService)
 
  //Especificamos cual es el rol que va esperar el guardian para activarse
  const rolEsperado = "admin"

  return false;
};
