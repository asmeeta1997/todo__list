import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatchPassword } from '../validators/mustMatchPassword';

@Component({
  selector: 'app-setpassword',
  templateUrl: './setpassword.component.html',
  styleUrls: ['./setpassword.component.scss']
})
export class SetpasswordComponent implements OnInit {
  createImage = "../../../assets/images/create-account.png";
  createImg = 'Create Image';

  public setPassword !: FormGroup;

  submit: boolean = false;
  hide = true;
  hide2=true;

  get all() {
    return this.setPassword.controls
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router:Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.setPassword = this.formBuilder.group({
      password: new FormControl("",   [ Validators.required, Validators.minLength(8)]),
      confirmpassword: new FormControl("", [ Validators.required])
    },
    {
      validators:MustMatchPassword('password','confirmpassword')
    })
  }

  signUp(form:NgForm) {
    this.submit = true;
    if (this.setPassword.invalid) {
      return;
    }
    this.http.post<any>("https://617b7a78d842cf001711befc.mockapi.io/signup", this.setPassword.value)
      .subscribe(res =>{
        this.toastr.success('Signup Successfully');
        this.router.navigate(['login'])
        this.setPassword.reset();
    }, err=>{
      this.toastr.error('Something went wrong', 'Main error',{
        timeOut: 3000,
      });
    })

  }

}
