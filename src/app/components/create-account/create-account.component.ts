import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  createImage ="../../../assets/images/create-account.png";
  createImg = 'Create Image';
  createAccount: FormGroup;
  submit: boolean = false;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createAccount = this.formBuilder.group({
      name: new FormControl("", [Validators.required, Validators.minLength(6)]),
      number: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email,Validators.pattern("^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$")])
    })
  }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm) {
    console.log(form);
    this.submit = true;
    if (this.createAccount.invalid) {
      return;
    }
    this.createAccount.reset();
  }

}
