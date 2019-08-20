import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = "app_token";
  // private baseUrl = "https://casperbotapii.herokuapp.com";
  private baseUrl = "http://localhost:3800";

  constructor(private http: HttpClient,
    private router: Router, ) { }

  private store(token) {    
    localStorage.setItem(this.tokenKey,  'Bearer ' + token);
  }

  private clear() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigateByUrl('/login');
  }

  private check() {
    return localStorage.getItem(this.tokenKey);
  }

  checkCredentials() {
    const token = this.check();
    return token != null;
  }

  private handleLogin(credentials) {
    this.http.post(`${this.baseUrl}/login`, credentials).subscribe((resp) => {

      this.store(resp);
      this.router.navigateByUrl('/home');

    }, (error) => { });
  }

   login(credentials) {
    return this.handleLogin(credentials);
  }

  logout() {
    this.clear();
  }
}
