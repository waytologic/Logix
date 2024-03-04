import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup , FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  accounterror:any;
  loginvalid:any;
  Invaliduser:any;
  allUser:any;
  role:any;
  user:any;
  isLoggedIn = false;
  isLoginFailed = false;
  form = new FormGroup({
    email : new FormControl(),
    password: new FormControl(),
  })

  get f(){
    return this.form.controls;
  }

  constructor(
    private router:Router,
    private myservice:UsersService,
    private storageService: StorageService,
    private formBuilder:FormBuilder
  ){}

  ngOnInit(): void {
    this.getallusers();
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15)
          ]
        ],
      }
    );
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.role = this.storageService.getUser().role;
    }
  }

  getallusers(){
    this.myservice.getAll().subscribe((res) => {
      console.log(res);
      this.allUser = res;
    })
    console.log(this.allUser)
  }

  onReset(): void {
    this.form.reset();
    this.accounterror = false;
  }

  login(){



    if (this.form.invalid) {
        this.accounterror = false;
      return;
    }
    this.myservice.getAll().subscribe((res) =>{
      let data = res;
      for (let item of this.allUser) {
        if(this.form.value.email == item['email'] && this.form.value.password == item['password'] ){
          this.loginvalid = true;
          this.accounterror = false;
          this.storageService.saveUser(item['name']);
          sessionStorage.setItem('loggedUser', item['name']);
          sessionStorage.setItem('emaildata', item['email']);
          document.querySelector(".popup")?.classList.add('active');
          document.querySelector(".popup1")?.classList.remove("active");
          this.user = sessionStorage.getItem('loggedUser');
          setTimeout(() => {
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.role = this.storageService.getUser().role;
            this.Invaliduser ="Login Sucess";
            console.log("Delayed for 1 second.");
            document.querySelector(".popup")?.classList.remove("active");
            document.querySelector(".popup1")?.classList.remove("active");
            this.router.navigate(['/home']);

          }, 2000);
          break;
        }else{
          this.loginvalid = false;
          this.accounterror = true;
          this.isLoginFailed = true;
          document.querySelector(".popup1")?.classList.add('active');
          this.Invaliduser ="Invalid user account!"
          document.querySelector(".closeBtn")?.addEventListener("click", () => {
            document.querySelector(".popup1")?.classList.remove("active");
            this.onReset();
          });
        }
      }

    })

  }


}
