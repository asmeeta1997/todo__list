import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../services/auth.service';
import { SignupService } from '../services/signup.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'Todo App';
  loginImage = "../../../assets/images/login.png";
  loginimagealt = 'Login image';
  public loginForm !: FormGroup;
  submit: boolean = false;
  isLoginMode = true;
  authResponse: any;
  users = "token";
  hide= true;


  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode;
  }
  constructor(
    private formBuilder: FormBuilder,
    private router : Router,
    private toastr: ToastrService,
    private auth: AuthService,
    private signupService: SignupService
  ) { }

  get all() {
    return this.loginForm.controls
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email,Validators.pattern("^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$")]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)])
    })
    if(this.auth.logintoken()) {
      this.router.navigate(['home'])
    }
  }
  onSubmit(form:NgForm) {
    this.submit = true;
    if (this.loginForm.invalid) {
      return;
    }
     this.signupService.getSignup()
      .subscribe(res =>{
        const user = res.find((a:any):any=>{
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
        });
        this.authResponse = res;
        if(user){
          localStorage.setItem("SessionUser", this.users);
          this.toastr.success('Login Successfully');
          this.loginForm.reset();
          this.router.navigate(['home'])
        }
        else{
          this.toastr.error('Email or Password incorrect','',{
            timeOut: 3000,
          });
        }
    }, err=>{
      this.toastr.error('Something went wrong', 'Main error',{
        timeOut: 3000,
      });
    })
  }
}
