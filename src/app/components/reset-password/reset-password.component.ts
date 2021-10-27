import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordImg = "../../../assets/images/create-account.png";
  resetPasswordImgAlt = "Reset Image";

  public resetPassword !: FormGroup;
  submit: boolean = false;

  get all() {
    return this.resetPassword.controls
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.resetPassword = this.formBuilder.group({
      password: new FormControl("",   [ Validators.required, Validators.minLength(8)]),
      confirmpassword: new FormControl("", [ Validators.required, ])
    },
    {
      validators:this.mustMatch('password','confirmpassword')
    })
  }

  mustMatch(controlName:string,matchingControlName:string){
    return(formGroup:FormGroup)=>{
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if(matchingControl.errors && !matchingControl.errors){
        return
      }
      if(control.value !== matchingControl.value){
        matchingControl.setErrors({mustMatch:true})
      }
      else{
        matchingControl.setErrors(null);
      }
    }
  
  }
  passwordReset(form:NgForm) {
    this.submit = true;
    if (this.resetPassword.invalid) {
      return;
    }
    this.http.post<any>("http://localhost:3000/resetpassword", this.resetPassword.value)
      .subscribe(res =>{
        this.toastr.success('ResetPassword Successfully');
        this.router.navigate(['login'])
        this.resetPassword.reset();
    }, err=>{
      this.toastr.error('Something went wrong', 'Main error',{
        timeOut: 3000,
      });
    })

  }

}
