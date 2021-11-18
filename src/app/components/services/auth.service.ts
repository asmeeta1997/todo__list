import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: boolean = false;

  constructor(private http: HttpClient,
    private router: Router
  ) { }

  login(email: string, password: string) {
    return this.http.post(`http://localhost:4200/login`, {
      email: email,
      password: password
    });
  }
  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('SessionUser');
    this.router.navigate(['']);
  }

  logintoken() {
    return !!localStorage.getItem("SessionUser");
  }
}