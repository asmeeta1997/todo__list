import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CreateAccountModel } from '../create-account/create-account.model';
import { ResetPasswordModel } from '../reset-password/reset-password.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }



  postSignup(data: CreateAccountModel) {
    return this.http.post("https://617b7a78d842cf001711befc.mockapi.io/signup", data)
      .pipe(map((res) => {
        return res;
      })
      );
  }
  
  getSignup(){
    return this.http.get("https://617b7a78d842cf001711befc.mockapi.io/signup")
      .pipe(map((res:any) => {
        return res;
      })
      );
  }
  postResetPassword(data: ResetPasswordModel) {
    return this.http.post("https://617b7a78d842cf001711befc.mockapi.io/resetpassword", data)
      .pipe(map((res) => {
        return res;
      })
      );
  }
}
