import { UserDetails } from './../models/app-user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
//  import * as fire from 'firebase;'


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  selectedVal: string;
  responseMessage = '';
  responseMessageType = '';
  emailInput: string;
  passwordInput: string;
  isForgotPassword: boolean;
  userDetails: any;
  displayEmail: any;


  constructor(private authService: AuthService, private router: Router, afauth: AngularFireAuth) {

    afauth.authState.subscribe(currentUser => {
      // this.displayEmail = currentUser.email;
    });
  }

    // Check localStorage is having User Data
    isUserLoggedIn() {
      this.userDetails = this.authService.isUserLoggedIn();

    }

     // Comman Method to Show Message and Hide after 2 seconds
 showMessage(type, msg) {
  this.responseMessageType = type;
  this.responseMessage = msg;
  setTimeout(() => {
    this.responseMessage = '';
  }, 2000);
}


  ngOnInit() {
    console.log(this.userDetails);
  }

}
