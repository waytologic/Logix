import { Component, OnInit,ViewChild } from '@angular/core';
import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit {
  @ViewChild('homes', { static: false })
  homes!: HomeComponent;

    constructor(){}
    ngOnInit(): void {
      let currpage =  localStorage.getItem('currentpage')
      if( currpage ="cards" ){
        let items = document.querySelector(".side-menu li + li");
        items?.classList.add('active')
    }
  }

}
