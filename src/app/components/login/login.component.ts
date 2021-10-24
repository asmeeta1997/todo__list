import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'Todo App';
  loginImage = "../../../assets/images/login.png";
  loginimagealt = 'Login image';
  loginForm !: FormGroup;
  submit: boolean = false;
  isLoginMode = true;

  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode;
  }


  constructor(
    private router : Router,
    private formBuilder: FormBuilder
  ) { }

  get all() {
    return this.loginForm.controls
  }

  onSubmit(form:NgForm) {
    console.log(form);
    this.submit = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loginForm.reset();
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email,Validators.pattern("^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$")]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    })
  }

  
}
