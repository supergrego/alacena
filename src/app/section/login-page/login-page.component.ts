import { User } from './../../providers/user';
import { AfService } from './../../providers/af.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {
  user: User;
  constructor(public afService: AfService) { }

  ngOnInit() {
    this.afService.user$.subscribe(user => this.user = user);
  }

  login(){
    this.afService.loginWithGoogle();
  }

  loginMail(){
    this.afService.loginWithEmail();
  }
  logout(){
    this.afService.logout();
  }
}
