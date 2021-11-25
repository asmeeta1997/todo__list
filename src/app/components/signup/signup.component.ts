import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormBuilder,
  NgForm,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../services/auth.service";
import { SignupService } from "../services/signup.service";
import { User } from "./signup.model";

@Component({
  selector: "app-create-account",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  createImage = "../../../assets/images/create-account.png";
  createImg = "Create Image";

  public createAccount!: FormGroup;
  submit: boolean = false;

  createAccountModelObj: User = new User();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private signupService: SignupService,
    private toastr: ToastrService,
    private auth: AuthService

  ) { }

  get signUpFormController() {
    return this.createAccount.controls;
  }

  ngOnInit(): void {
    this.initializeSignup();
  }
  initializeSignup(): void {
    this.createAccount = this.formBuilder.group({
      fullname:["",
        [Validators.required,
        Validators.minLength(4)]
      ],
      email:["",
        [Validators.required,
        Validators.email,
        Validators.pattern("^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$")]
      ],
      date:["",Validators.required],
      phonenumber:["",
        [Validators.required,
        Validators.pattern("[0-9 ]{10}")]
      ],
    });
    if (this.auth.logintoken()) {
      this.router.navigate(['home'])
    }
  }

  signUp(form: NgForm): void {
    this.createAccounts();
  }
  createAccounts(): void {
    this.submit = true;
    if (this.createAccount.invalid) {
      return;
    }
    this.createAccountModelObj.fullname = this.createAccount.value.fullname;
    this.createAccountModelObj.date = this.createAccount.value.date;
    this.createAccountModelObj.phonenumber =
      this.createAccount.value.phonenumber;
    this.createAccountModelObj.email = this.createAccount.value.email;
    this.signupService.postSignup(this.createAccountModelObj).subscribe(
      () => {
        this.createAccount.reset();
        this.router.navigate(["set-password"]);
      },
      (err) => {
        this.toastr.error("Something went wrong", "Main error", {
          timeOut: 3000,
        });
      }
    );
  }
}
