import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrModule } from 'ngx-toastr';
import { UsersService } from './../services/users.service';

import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';



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
              private route: ActivatedRoute,
              private angularFireAuth: AngularFireAuth,
              private _flashMessage: FlashMessagesService,
              private authService: AuthService, private router: Router) {

    this.selectedVal = 'login';
    this.isForgotPassword = false;
  }

 // Check localStorage is having User Data
 isUserLoggedIn() {
  this.userDetails = this.authService.isUserLoggedIn();
}

async loginUser() {
  this.loading = true;
 let email = this.emailInput.toLowerCase();
  let password = this.passwordInput;
  console.log(email, password);
  const returnUrl  = this.route.snapshot.queryParamMap.get('returnUrl') || '/welcome';

  return await this.angularFireAuth.auth.signInWithEmailAndPassword( email, password).then(value => {
    this.loading = false;
    this.router.navigateByUrl(returnUrl);
    localStorage.setItem('currentUserEmail', email);
  }).catch(error => {
    this.loading = false;
    window.localStorage.clear();
    window.localStorage.removeItem('currentUserEmail');
    this._flashMessage.show(`${error.code}`,
    { cssClass: 'text-center bg-danger text-white  font-weight-bold', timeout: 4000 });


  });

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
