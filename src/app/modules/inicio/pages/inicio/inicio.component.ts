import { Component } from '@angular/core';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
 
  //Propiedad pública (tipo array)
  public destacados: Card[]

  constructor(){
    this.destacados = [
      {
        uid:'',
        img: '../assets/cards-inicio/card1.jpg',
        alt: ''
      },
      {
        uid: '',
        img: '../assets/cards-inicio/card2.jpg',
        alt: ''
      },
      {
        uid: '',
        img: '../assets/cards-inicio/card3.jpg',
        alt: ''
      }
    ]
 }
}
