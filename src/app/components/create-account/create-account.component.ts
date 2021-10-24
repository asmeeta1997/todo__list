import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  createImage = "../../../assets/images/create-account.png";
  createImg = 'Create Image';

  public createAccount !: FormGroup;
  submit: boolean = false;


  get all() {
    return this.createAccount.controls
  }
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
    ){
  }

  ngOnInit(): void {
    this.createAccount = this.formBuilder.group({
      fullname: [''],
      email:  new FormControl("", [Validators.required, Validators.email,Validators.pattern("^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$")]),
      date: [''],
      phonenumber: [''],
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    })
  }

  signUp(form:NgForm) {
    this.http.post<any>("http://localhost:3000/signupUsers", this.createAccount.value)
      .subscribe(res =>{
      alert("Signup Succesfully");
      this.createAccount.reset();
      this.router.navigate(['login'])
    }, err=>{
      alert("Something went wrong")
    })

  }
}
