import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss','../../../assets/sass/main.scss']
})
export class ForgotPasswordComponent implements OnInit {
  title = 'Todo App';
  forgetImage="../../../assets/images/forgetpassword.png";
  forgetImg = 'Forget Image';

  constructor() { }

  ngOnInit(): void {
  }

}
