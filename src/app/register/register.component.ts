import { FlashMessagesService } from 'angular2-flash-messages';
import { Account } from './../models/account';
import { Observable, Subscribable } from 'rxjs';
import { AngularFirestore , AngularFirestoreCollection } from '@angular/fire/firestore';

import { UsersService } from './../services/users.service';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import {FormGroup, FormControl, NgForm} from '@angular/forms';
import { User } from 'firebase';
import { NgbModal, NgbModalConfig, NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import * as firebase from 'firebase';
import { first, map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  checkUserId: Observable<any[]>;
  moneyminePolicy: boolean;
  errorMessage: string; successMessage: string;
  responseMessage = ''; responseMessageType = '';
  emailInput: string; passwordInput: string;
  isForgotPassword: boolean; userDetails: string;
  passwordError: string;
  allEmails: any [];
  role: string;
  showREfId: boolean;
  phoneNumber: any;
   lastUserId: any;
    checkEmail: any;
    loading: boolean;



  constructor(public authService: AuthService, private db: AngularFirestore,
              public modalService: NgbModal, private router: Router,
              private userService: UsersService, config: NgbProgressbarConfig,
              private flashMessage: FlashMessagesService,
              private angularFireAuth: AngularFireAuth) {
                this.checkUserId = db.collection('users').valueChanges();
               }

  ngOnInit() {
    this.loading = false;
    this.alignWindow();

    this.role ='investor';
    this.resetForm();
    this.db.collection('users', reff =>
      reff.orderBy('created', 'desc').limit(1)).valueChanges().subscribe((val: any) => {
        val.map(response => this.lastUserId = response.id);
      });

  }

  ngOnDestroy() {

  }
    // show message*
   showMessage(type, msg) { this.responseMessageType = type;
                            this.responseMessage = msg;
                            setTimeout(() => { this.responseMessage = ''; }, 10000);
   }


  resetForm(form?: NgForm) {
    if (form != null) { form.resetForm(); }

    this.authService.formData = {
      id : null, fullname: '',  email: '', password: '',
       mobile: null,  referral: null, role:'',
       created: null, payment: false, account: false, trade: false

    };
  }

  async createNewUser(form: NgForm) {
    this.loading = true;
    this.phoneNumber = form.value.mobile;
    const regEmail = form.value.email.toLowerCase();
    const password = form.value.password;
    form.value.role = this.role;
    form.value.created = new Date();

    // create new account for new user.
    const newAccount =  this.userService.accountBalance = {
      trading: 0.00, amount: 0.00, profit: 0.00, cashout: 0.00,
       email: regEmail, created:  new Date(),
     };

    return await this.angularFireAuth.auth.createUserWithEmailAndPassword(regEmail, password).then( value => {
      this.router.navigate(['/welcome']);
      this.loading = false;
      this.authService.sendEmailVerification();
      form.value.password = '';
      form.value.email.toLowerCase();
      this.authService.storeUserDetails(form.value);
      this.userService.createAccountBalance(newAccount);
      localStorage.setItem('currentUserEmail', regEmail.toLocaleLowerCase());

    }).catch(err => {
      console.log(err);
      this.flashMessage.show(`${err.code}`,
      { cssClass: 'text-center bg-danger text-white  font-weight-bold', timeout: 4000 });
      this.loading = false;
    });

  }

   // Check localStorage is having User Data
   isUserLoggedIn() {
    this.userDetails = this.authService.isUserLoggedIn();
  }

  // validate user password..
  confirmInputPassword() {
    const submitButton = document.querySelector('#submitBtn') as HTMLInputElement;
    submitButton.disabled = false;
    const password1 = document.querySelector('#password') as HTMLInputElement;
    const password2 = document.querySelector('#password_conf') as HTMLInputElement;

    if (password1.value === password2.value) { submitButton.disabled = false;
    } else  {
      submitButton.disabled = true;
      this.loading = false;
      const message = ' password not matched';
      this.passwordError = message;

    }
  }

  selectOption() {
   const result = document.getElementById('inputGroupSelect') as HTMLInputElement;
   if (result.value === 'investor') {
     this.role = result.value;
     console.log(this.role);
     this.showREfId = true;
   } else {
     this.role = 'marketer';
     console.log(this.role);
     this.showREfId = false;
   }
  }

  navigateToHome() {
    this.router.navigate(['/welcome']);
  }

  alignWindow(){
    this.router.events.subscribe((evt) => {
      if(!(evt instanceof NavigationEnd)){
        return ;
      }

      window.scrollTo(0,0);
    });
  }




}
