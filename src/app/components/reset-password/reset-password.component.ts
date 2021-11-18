import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../services/auth.service";
import { SignupService } from "../services/signup.service";
import { MustMatchPassword } from "../validators/mustMatchPassword";
import { ResetPasswordModel } from "./reset-password.model";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordImg = "../../../assets/images/reset-password.png";
  resetPasswordImgAlt = "Reset Image";

  public resetPassword!: FormGroup;
  submit: boolean = false;

  hide = true;
  hide2 = true;

  resetPasswordModelObj: ResetPasswordModel = new ResetPasswordModel();

  get resetPasswordFormController() {
    return this.resetPassword.controls
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private signupService: SignupService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.initializeResetPassword();
  }

  initializeResetPassword(): void {
    this.resetPassword = this.formBuilder.group({
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmpassword: new FormControl("", [Validators.required]),
    }, {
      validators: MustMatchPassword("password", "confirmpassword"),
    });
    if (this.auth.logintoken()) {
      this.router.navigate(['home'])
    }
  }

  passwordReset(form: NgForm): void {
    this.submit = true;
    if (this.resetPassword.invalid) {
      return;
    }
  }
  resetPasswords(): void {
    this.resetPasswordModelObj.password = this.resetPassword.value.password;
    this.resetPasswordModelObj.confirmpassword =
      this.resetPassword.value.confirmpassword;
    this.signupService.postResetPassword(this.resetPasswordModelObj).subscribe(
      (res) => {
        this.toastr.success("ResetPassword Successfully");
        this.router.navigate(["login"]);
        this.resetPassword.reset();
      },
      (err) => {
        this.toastr.error("Something went wrong", "Main error", {
          timeOut: 3000,
        });
      }
    );
  }
}
