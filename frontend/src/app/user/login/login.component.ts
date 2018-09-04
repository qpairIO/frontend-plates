import {Component, OnInit} from '@angular/core';

import {LoginService} from '../login.service';


@Component({
  selector: 'app-user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  user: {
    email: string;
    password: string;
  } = {
    email: '',
    password: ''
  };

  constructor(private loginService: LoginService) {}

  ngOnInit() {}


  doLogin() {
    this.loginService.logIn(this.user.email, this.user.password);
  }

  googleAuth() {
    this.loginService.googleLogin();
  }
}
