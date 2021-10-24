import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

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

  constructor(
    private formBuilder: FormBuilder,
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
    alert("Email Send Succesfully");
    this.passwordforgot.reset();

  }
}
