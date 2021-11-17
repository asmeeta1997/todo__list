import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignupService } from '../services/signup.service';
import { CreateAccountModel } from './signup.model';

@Component({
  selector: 'app-create-account',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  createImage = "../../../assets/images/create-account.png";
  createImg = 'Create Image';

  public createAccount !: FormGroup;
  submit: boolean = false;

  createAccountModelObj: CreateAccountModel = new CreateAccountModel();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private signupService: SignupService,
    private toastr: ToastrService
  ) {
  }

  get f() {
    return this.createAccount.controls
  }

  ngOnInit(): void {
    this.initializeSignup();
  }
  initializeSignup(): void {
    this.createAccount = this.formBuilder.group({
      fullname: new FormControl("", [Validators.required, Validators.minLength(4)]),
      email: new FormControl("", [Validators.required, Validators.email, Validators.pattern("^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$")]),
      date: new FormControl("", [Validators.required]),
      phonenumber: new FormControl("", [Validators.required, Validators.pattern("[0-9 ]{10}")])
    })
  }

  signUp(form: NgForm):void{
    this.submit = true;
    if (this.createAccount.invalid) {
      return;
    }
  }
  createAccounts():void{
    this.createAccountModelObj.fullname = this.createAccount.value.fullname;
    this.createAccountModelObj.date = this.createAccount.value.date;
    this.createAccountModelObj.phonenumber = this.createAccount.value.phonenumber;
    this.createAccountModelObj.email = this.createAccount.value.email;
    this.signupService.postSignup(this.createAccountModelObj)
      .subscribe(res => {
        this.createAccount.reset();
        this.router.navigate(['set-password'])
      }, err => {
        this.toastr.error('Something went wrong', 'Main error', {
          timeOut: 3000,
        });
      })
  }
}
