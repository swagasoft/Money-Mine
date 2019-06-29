import { ToastrModule } from 'ngx-toastr';
import { UsersService } from './../services/users.service';

import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, HostBinding } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  inValidLogin: boolean;

  selectedVal: string;
  responseMessage = '';
  responseMessageType = '';
  emailInput: string;
  passwordInput: string;
  isForgotPassword: boolean;
  userDetails: any;

  constructor(private usersService: UsersService  ,
    private toastr : ToastrModule,
    private authService: AuthService, private router: Router) {
    // authService.user$.subscribe(user => {
    //   if (user) {

    //   }
    // });

    this.selectedVal = 'login';
    this.isForgotPassword = false;
  }

 // Comman Method to Show Message and Hide after 2 seconds
 showMessage(type, msg) {
  this.responseMessageType = type;
  this.responseMessage = msg;
  setTimeout(() => {
    this.responseMessage = '';
  }, 8000);
}
 // Check localStorage is having User Data
 isUserLoggedIn() {
  this.userDetails = this.authService.isUserLoggedIn();
}

 // Login user with  provided Email/ Password
 loginUser() {
  this.responseMessage = '';
  this.authService.login(this.emailInput, this.passwordInput)
    .then(res => {
      this.isUserLoggedIn();
    }, err => {
      this.showMessage('danger', err.message);
      // this.toastr.error()
    });
  localStorage.setItem('currentUserEmail', this.emailInput.toLocaleLowerCase());

}



  ngOnInit() {
  }

}
