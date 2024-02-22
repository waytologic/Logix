import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup , FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import Validation from '../core/validation/validation';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  loginvalid:any
  Invaliduser:any;
  accounterror:any;
  allUser:any;
  showPassword: boolean = false;
  showcPassword: boolean = false;
  switchclass: boolean = false;
  switchCclass: boolean = false;

  forms = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  })

  submitted = false;

  get f(): { [key: string]: AbstractControl } {
    return this.forms.controls;
  }

  constructor(
    private router:Router,
    private formBuilder:FormBuilder,
    private myservice:UsersService
  ){}

  ngOnInit(): void {
    this.forms = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15)
          ]
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmPassword'),Validators.minLength(6),
        Validators.maxLength(15)]
      }
    );
    this.getallusers();
  }
  getallusers(){
    this.myservice.getAll().subscribe((res) => {
     /// console.log(res);
      this.allUser = res;
    })

  }

  showHidePassword() {
    this.showPassword = !this.showPassword;
    this.switchclass = !this.switchclass;

  }
  showHidecPassword() {
    this.showcPassword = !this.showcPassword;
    this.switchCclass = !this.switchCclass;

  }

  submit(){
    this.submitted = true;
    if (this.forms.invalid) {
      return;
    }
    for (let item of this.allUser ) {
      if(this.forms.value.email == item['email'] ){
        alert('Email Already Taken');
        this.Invaliduser ="Already email account exit";
        this.accounterror = true;
        this.onReset();
        break;
      }else{
        //alert('Create new record  ');
        this.loginvalid = false;
          this.accounterror = true;
          document.querySelector(".popup1")?.classList.add('active');
          this.Invaliduser ="Access denied for new user"
          document.querySelector(".closeBtn")?.addEventListener("click", () => {
            document.querySelector(".popup1")?.classList.remove("active");
            this.onReset();
          });

      }
    }

    // for (let item of this.allUser) {
    //   if(this.forms.value.email == item['email'] ){
    //     alert('Email Already Taken');
    //     this.Invaliduser ="Already email account exit";
    //     this.accounterror = true;
    //     this.onReset();
    //     break;
    //   }else{
    //     alert('Start creating record!!!');
    //      this.loginvalid = true;
    //      this.accounterror = false;
    //      this.myservice.Createuser(this.forms.value).subscribe((res) => {
    //         alert('Sucessfully registered');
    //         this.onReset();
    //         this.login();
    //       })
    //   }
    // }
    // this.myservice.getAll().subscribe((res) =>{
    //   let data = res;
    //   for (let item of this.allUser) {
    //     if(this.forms.value.email == item['email'] ){
    //       alert('Email Already Taken');
    //       this.Invaliduser ="Already email account exit";
    //       this.accounterror = true;
    //       this.onReset();
    //     }else{
    //       alert('Start creating record!!!')
    //       this.loginvalid = true;
    //       this.accounterror = false;
    //       this.myservice.Createuser(this.forms.value).subscribe((res) => {
    //         alert('Sucessfully registered');
    //         this.onReset();
    //         this.login();
    //       })
    //       console.log(JSON.stringify(this.forms.value, null, 2));

    //       this.Invaliduser =""
    //     }
    //   }

    // })

  }

  login() {
    this.router.navigate(['/login']);
  }
  onReset(): void {
    this.submitted = false;
    this.forms.reset();
    this.accounterror = false;
  }

}
