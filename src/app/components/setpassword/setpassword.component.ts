import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateAccountModel } from '../create-account/create-account.model';
import { SignupService } from '../services/signup.service';
import { MustMatchPassword } from '../validators/mustMatchPassword';
@Component({
  selector: 'app-setpassword',
  templateUrl: './setpassword.component.html',
  styleUrls: ['./setpassword.component.scss']
})
export class SetpasswordComponent implements OnInit {
  createImage = "../../../assets/images/create-account.png";
  createImg = 'Create Image';

  public setPassword !: FormGroup;

  submit: boolean = false;
  hide = true;
  hide2=true;

  createAccountModelObj:CreateAccountModel = new CreateAccountModel();


  get all() {
    return this.setPassword.controls
  }

  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private toastr: ToastrService,
    private signupService :SignupService,

  ) { }

  ngOnInit(): void {
    this.setPassword = this.formBuilder.group({
      password: new FormControl("",   [ Validators.required, Validators.minLength(8)]),
      confirmpassword: new FormControl("", [ Validators.required])
    },
    {
      validators:MustMatchPassword('password','confirmpassword')
    })
  }

  signUp(form:NgForm) {
    this.submit = true;
    if (this.setPassword.invalid) {
      return;
    }
    this.createAccountModelObj.fullname = this.setPassword.value.fullname;
    this.signupService.postSignup(this.createAccountModelObj)
      .subscribe(res =>{
        this.toastr.success('Signup Successfully');
        this.router.navigate(['login'])
        this.setPassword.reset();
    }, err=>{
      this.toastr.error('Something went wrong', 'Main error',{
        timeOut: 3000,
      });
    })

  }

}
