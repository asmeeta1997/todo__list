import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  NgForm,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

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

  get all() {
    return this.passwordforgot.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.passwordforgot = this.formBuilder.group({
      email: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.pattern("^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$"),
      ]),
    });
  }

  forgotPass(form: NgForm) {
    this.submit = true;
    if (this.passwordforgot.invalid) {
      return;
    }
    this.http.get<any>("https://617b7a78d842cf001711befc.mockapi.io/signup").subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return a.email === this.passwordforgot.value.email;
        });
        if (user) {
          // this.router.navigate(["/"]);
          // this.passwordforgot.reset();
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
  sendEmail(){
    this.http.get<any>("https://617b7a78d842cf001711befc.mockapi.io/signup").subscribe(
      (res) => {
        const user = res.find((a: any) => {
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
