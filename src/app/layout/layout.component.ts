import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  menuBtn:any;
  header:any;
  btns:any;
  videos:any;
  constructor( private router:Router){

  }

  ngOnInit(): void {
    this.loadslider();
  }

  login(){
    this.router.navigate(['./login']);
  }

  loadslider(){
    let menuBtn = document.querySelector(".menu-btn");
    let header = document.querySelector(".header");
    let btns = document.querySelectorAll(".nav-item");
    let videos = document.querySelectorAll("video");



    btns.forEach((btn, i) => {
      setTimeout(function(){


      btn.addEventListener("click", () => {
        btns.forEach((item) => {
          item.classList.remove("active");
        });

        videos.forEach((video) => {
          video.classList.remove("active");
        });

        videos[i].classList.add("active");
        btn.classList.add("active");
      });
    }, 1000);
    });

  }

  showlist(){
    let header = document.querySelector(".header");
    header?.classList.toggle("active");
  }

  slider(){

  }
  options(value:any){
    if(value == 'fb'){
      alert('fb')
    }else if(value == 'instagram'){
      alert('insta')
    }else if(value == 'twitter'){
      alert(' twitter X')
    }
  }
}
