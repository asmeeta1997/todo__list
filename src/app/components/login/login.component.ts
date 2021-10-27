import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'


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

  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode;
  }


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router : Router,
    private toastr: ToastrService
  ) { }

  get all() {
    return this.loginForm.controls
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email,Validators.pattern("^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$")]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit(form:NgForm) {
    console.log(form);
    this.submit = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.http.post<any>("http://localhost:3000/login", this.loginForm.value)
      .subscribe(res =>{
      this.toastr.success('Login Successfully');
      this.router.navigate(['home'])
      this.loginForm.reset();
    }, err=>{
      this.toastr.error('Something went wrong', 'Main error',{
        timeOut: 3000,
      });
    })
  }
 

  
}
