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

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
    ){
  }

  get all() {
    return this.createAccount.controls
  }

  ngOnInit(): void {
    this.createAccount = this.formBuilder.group({
      fullname: new FormControl("", [Validators.required,Validators.minLength(4)]),
      email:  new FormControl("", [Validators.required, Validators.email,Validators.pattern("^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$")]),
      date: new FormControl("", [Validators.required]),
      phonenumber: new FormControl("", [Validators.required, Validators.pattern("[0-9 ]{10}")])
    })
  }

  signUp(form:NgForm) {
    this.submit = true;
    if (this.createAccount.invalid) {
      return;
    }
    this.http.post<any>("http://localhost:3000/signUp", this.createAccount.value)
      .subscribe(res =>{
      this.createAccount.reset();
      this.router.navigate(['set-password'])
    }, err=>{
      alert("Something went wrong")
    })

  }
}
