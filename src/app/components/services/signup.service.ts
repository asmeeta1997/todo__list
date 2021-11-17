import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { User } from "../signup/signup.model";
import { ResetPasswordModel } from "../reset-password/reset-password.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SignupService {
  constructor(private http: HttpClient) {}

  postSignup(data: User):Observable<User> {
    return this.http
      .post<User>("https://617b7a78d842cf001711befc.mockapi.io/signup", data)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getSignup():Observable<User[]> {
    return this.http
      .get<User[]>("https://617b7a78d842cf001711befc.mockapi.io/signup")
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  postResetPassword(data: ResetPasswordModel):Observable<ResetPasswordModel> {
    return this.http
      .post<ResetPasswordModel>("https://617b7a78d842cf001711befc.mockapi.io/resetpassword", data)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
