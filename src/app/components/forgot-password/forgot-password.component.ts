import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  NgForm
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../services/auth.service";
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
  emailimagealt = "Email Send";
  submit: boolean = false;

  public passwordForgot!: FormGroup;

  get passwordForgotFormController() {
    return this.passwordForgot.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private signupService: SignupService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.initializeForgotPassword();
  }
  initializeForgotPassword(): void {
    this.passwordForgot = this.formBuilder.group({
      email: ["",
        [Validators.required,
        Validators.email,
        Validators.pattern("^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$")]
      ],
    });
    if (this.auth.logintoken()) {
      this.router.navigate(['home'])
    }
  }

  forgotPassword(form: NgForm): void {
    this.submit = true;
    if (this.passwordForgot.invalid) {
      return;
    }
  }
  sendEmail(): void {
    this.signupService.getSignup().subscribe(
      (res) => {
        const user = res.find((a) => {
          return a.email === this.passwordForgot.value.email;
        });
        if (user) {
          this.router.navigate(["/"]);
          this.passwordForgot.reset();
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
