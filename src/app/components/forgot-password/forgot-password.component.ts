import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  NgForm
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { SignupService } from "../services/signup.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: [
    "./forgot-password.component.scss",
    "../../../assets/sass/main.scss",
  ],
})
export class ForgotPasswordComponent implements OnInit {
  title = "Todo App";
  forgetImage = "../../../assets/images/forgetpassword.png";
  forgetImg = "Forget Image";
  emailimage = "../../../assets/images/emailsend1.png";
  emailimagealt="Email Send";
  submit: boolean = false;

  public passwordforgot!: FormGroup;

  get f() {
    return this.passwordforgot.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private signupService: SignupService
  ) {}

  ngOnInit(): void {
    this.initializeForgotPassword();
  }
  initializeForgotPassword():void{
    this.passwordforgot = this.formBuilder.group({
      email: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.pattern("^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$"),
      ]),
    });
  }

  forgotPassword(form: NgForm):void {
    this.submit = true;
    if (this.passwordforgot.invalid) {
      return;
    }
  }
  sendEmail():void{
    this.signupService.getSignup()
    .subscribe(
      (res) => {
        const user = res.find((a) => {
          return a.email === this.passwordforgot.value.email;
        });
        if (user) {
          this.router.navigate(["/"]);
          this.passwordforgot.reset();
        } else {
          this.toastr.error("Incorrect Email", "", {
            timeOut: 3000,
          });
        }
      },
      (err) => {
        this.toastr.error("Something went wrong", "Main error", {
          timeOut: 3000,
        });
      }
    );

  }
}
