import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials;
  invalidPin = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.credentials = {
      login: "admin",
      password: ""
    }
  }

  login(){
    this.authService.login(this.credentials);
    this.invalidPin = !this.authService.checkCredentials();
  }

}
