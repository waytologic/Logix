import { Component, HostListener,OnInit, } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras, RouterState } from '@angular/router';
import { Observable } from 'rxjs';
import { Session } from 'inspector';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  user:any;
  title = '';
  Tennet:any;
  searchFrom:any;
  searchBtn:any;
  searchIcon:any;
  sideBar:any;
  menuBar:any;
  paths:any;
  gettheme:any;
  menus:any;
  miniavator:any;
  avator:any;
  constructor(
    private router:Router,
    private storageService: StorageService
  ){}
  ngOnInit(): void {
    //this.user = sessionStorage.getItem('loggedUser');
    this.user = this.storageService.getUser();
    this.avator = this.user.substr(0, 2)
    this.Tennet = "arpino";
    localStorage.setItem('Tenant',this.Tennet.trim());
    document.documentElement.classList.add('dark');
    this.loadtheme();
    this.menus = [
      { id: 1 , url: this.Tennet+"/dashboard" , page:"dashboard" , icon:"fa-sharp fa-regular fa-table-columns" },
      { id: 2 , url: this.Tennet+"/users" , page:"Users", icon:"fa-sharp fa-solid fa-user-tie" },
      // { id: 3 , url: "/login" , page:"Login" },
    ]
  }

  setactive(){
    //side-menu

    let items = document.querySelectorAll(".side-menu li");
    items.forEach((item) => {
      item.addEventListener("click", () => {
        items.forEach((link) => {
          link.classList.remove("active");
        });
        item.classList.add("active");
      });
    });
  }


  logout(){

    this.router.navigate(['/'])
    sessionStorage.clear();
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {

    //alert(this.getScreenWidth + " -> W " + "H: " +  this.getScreenHeight)
    if (window.innerWidth < 576) {
      this.sideBar?.classList.add("show");
      //this.sideBar?.classList.toggle("hide");
    }

    if(window.innerWidth < 576 ){
      this.togglemenu()
      this.searchIcon.classList.replace("fa-times", "fa-search");
      this.searchFrom.classList.remove("show");
    }else if(window.innerWidth > 768 ){
      this.togglemenu()
     // this.sideBar.classList.add("hide");
    }

  }
  search(e:any){
    this.searchFrom = document.querySelector(".content nav form");
    this.searchBtn = document.querySelector(".search-btn");
    this.searchIcon = document.querySelector(".search-icon");
    if (window.innerWidth < 576) {
      e.preventDefault();
      this.searchFrom.classList.toggle("show");
      if (this.searchFrom.classList.contains("show")) {
        this.searchIcon.classList.replace("fa-search", "fa-times");
      } else {
        this.searchIcon.classList.replace("fa-times", "fa-search");
      }
    }
  }

  togglemenu(){
    this.menuBar = document.querySelector(".menu-btn");
    this.sideBar = document.querySelector(".sidebar");
    this.miniavator = document.querySelector(".userdetail");
    this.sideBar?.classList.toggle("hide");
    this.miniavator?.classList.toggle("hideme");

  }

  loadtheme(){
    const checkboxlist = document.getElementById('switch-mode',) as HTMLInputElement | null;
    const toggleSwitch: HTMLInputElement = this.gettheme;
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    console.log(currentTheme)
    if (currentTheme == "dark") {
      if (checkboxlist != null) {
        document.body.classList.add("dark");
        checkboxlist.checked = true;
      }
    } else if (currentTheme == "light") {
      document.body.classList.remove("dark");
      if (checkboxlist != null) {
        checkboxlist.checked = false;
      }

    }

    console.log(checkboxlist?.checked)

  }

  switch(event:any){
    if (event.target.checked) {
      document.body.classList.add("dark");
      localStorage.setItem('theme', 'dark'); //add this
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem('theme', 'Light'); //add this
    }
  }

  loadsidemenu(){
    let sideMenu = document.querySelectorAll(".nav-link");
    sideMenu.forEach((item) => {
      let li = item.parentElement;
      item.addEventListener("click", () => {
        sideMenu.forEach((link) => {
          link.parentElement?.classList.remove('active');
        });
        li?.classList.add("active");
      });
    });
  }
}
