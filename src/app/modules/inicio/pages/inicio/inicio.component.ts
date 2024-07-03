import { Component } from '@angular/core';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
 
  //Propiedad pública (tipo array)
  public promo: Card[]

  constructor(){
    this.promo = [
      {
        uid: 'promo1',
        img: '../../../../../assets/promo1.jpeg',
        alt: 'promito 1'
      },
      {
        uid: 'promo2',
        img: '../../../../../assets/promo2.jpeg',
        alt: 'promito 2'
      },
      {
        uid: 'promo3',
        img: '../../../../../assets/promo3.jpeg',
        alt: 'promito 3'
      }
    ]
  }
}
