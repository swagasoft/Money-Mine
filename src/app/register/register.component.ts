import { UsersService } from './../services/users.service';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { element } from '@angular/core/src/render3';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {
regform = new FormGroup({
email: new FormControl(),
password: new FormControl(),
password_conf: new FormControl(),
} );


wrongPassword = false;

errorMessage: string;
username: string;
successMessage: string;
selectedVal: string;
responseMessage = '';
responseMessageType = '';
emailInput: string;
passwordInput: string;
isForgotPassword: boolean;
userDetails: any;

  constructor(private authService: AuthService, private router: Router,private userService: UsersService ) {

   }

   showMessage(type, msg) {
     this.responseMessageType = type;
     this.responseMessage = msg;
     setTimeout(() => {
      this.responseMessage = '';
    }, 9000);
   }



   // Register user with  provided Email/ Password
   registerUser() {

    this.authService.register(this.emailInput , this.passwordInput)
      .then(res => {

        // Send Varification link in email
        this.authService.sendEmailVerification().then(res => {
          console.log(res);
          this.isForgotPassword = false;
          this.showMessage('success', 'Registration Successful! Please Verify Your Email');
          this.router.navigate(['/user/select/account']);
          // save user to database
          this.authService.user$.subscribe(user => {
            if(user){
              this.userService.save(user);
            }
          });
        }
        , err => {
          this.showMessage('danger', err.message);

        });
        this.isUserLoggedIn();


      }, err => {
        this.showMessage('danger', err.message);
      });
  }

   // Check localStorage is having User Data
   isUserLoggedIn() {
    this.userDetails = this.authService.isUserLoggedIn();
  }

  confirmInputPassword() {
    console.log('you are there');
    const submitButton = document.querySelector('#submitBtn') as HTMLInputElement;
    submitButton.disabled = false;

    const password1 = document.querySelector('#password') as HTMLInputElement;
    const password2 = document.querySelector('#password_conf') as HTMLInputElement;
    if (password1.value === password2.value) {
      console.log('correct password');
      submitButton.disabled = false;

    } else  {
      console.log('wrong password');
      this.showMessage('danger', 'password not matched!');
      submitButton.disabled = true;
    }


    }


}
