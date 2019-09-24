import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrModule } from 'ngx-toastr';
import { UsersService } from './../services/users.service';

import { Router, NavigationEnd } from '@angular/router';
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
  serverError: string;
  loading: boolean;

  constructor(private usersService: UsersService  ,
              private toastr : ToastrModule,
              private _flashMessage: FlashMessagesService,
              private authService: AuthService, private router: Router) {
    // authService.user$.subscribe(user => {
    //   if (user) {

    //   }
    // });


    this.selectedVal = 'login';
    this.isForgotPassword = false;
  }

 // Check localStorage is having User Data
 isUserLoggedIn() {
  this.userDetails = this.authService.isUserLoggedIn();
}

 // Login user with  provided Email/ Password
 loginUser() {
   this.loading = true;
  this.serverError = this.authService.loginError;
   this.authService.login(this.emailInput, this.passwordInput)
    .then(res => {
      console.log(this.serverError);
      this.loading = false;

      if(this.serverError  != undefined){
    this._flashMessage.show(`invalid credentials!`,
    { cssClass: 'text-center bg-danger text-white  font-weight-bold', timeout: 4000 });

    this.serverError = null;
    console.log('second',this.serverError);
  }

    }, err => {
      this.loading = false;
      this._flashMessage.show(`${err}`,
{ cssClass: 'text-center bg-danger text-white font-weight-bold', timeout: 4000 });

    })
   localStorage.setItem('currentUserEmail', this.emailInput.toLocaleLowerCase());


}





  ngOnInit() {
    console.log(this.serverError);
    this.loading = false;
    this.router.events.subscribe((evt) => {
      if(!(evt instanceof NavigationEnd)){
        return ;
      }

      window.scrollTo(0, 0);
    });


  }

}
