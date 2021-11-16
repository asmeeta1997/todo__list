import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatchPassword } from '../validators/mustMatchPassword';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordImg = "../../../assets/images/reset-password.png";
  resetPasswordImgAlt = "Reset Image";

  public resetPassword !: FormGroup;
  submit: boolean = false;

  hide =  true;
  hide2 = true;

  get all() {
    return this.resetPassword.controls
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.resetPassword = this.formBuilder.group({
      password: new FormControl("",   [ Validators.required, Validators.minLength(8)]),
      confirmpassword: new FormControl("", [ Validators.required,])
    },
    {
      validators:MustMatchPassword('password','confirmpassword')
    })
  }
  passwordReset(form:NgForm) {
    this.submit = true;
    if (this.resetPassword.invalid) {
      return;
    }
    this.http.post<any>("https://617b7a78d842cf001711befc.mockapi.io/resetpassword", this.resetPassword.value)
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
