import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss', '../../../assets/sass/main.scss']
})
export class ForgotPasswordComponent implements OnInit {
  title = 'Todo App';
  forgetImage = "../../../assets/images/forgetpassword.png";
  forgetImg = 'Forget Image';
  submit: boolean = false;

  public passwordforgot!: FormGroup;

  get all() {
    return this.passwordforgot.controls
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.passwordforgot = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email, Validators.pattern("^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$")])
    })
  }

  forgotPass(form:NgForm){
    console.log(form);
    this.submit = true;
    if (this.passwordforgot.invalid) {
      return;
    }
    this.router.navigate(['reset-password'])
    this.passwordforgot.reset();

  }
}
