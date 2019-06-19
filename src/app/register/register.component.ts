import { Observable } from 'rxjs';
import { AngularFirestore , AngularFirestoreCollection } from '@angular/fire/firestore';

import { UsersService } from './../services/users.service';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import {FormGroup, FormControl, NgForm} from '@angular/forms';
import { User } from 'firebase';
import { NgbModal, NgbModalConfig, NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import * as firebase from 'firebase';
import { first, map } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  checkUserId: Observable<any[]>;
  moneyminePolicy: boolean;

  constructor(public authService: AuthService, private db: AngularFirestore,
              public modalService: NgbModal, private router: Router,
              private userService: UsersService, config: NgbProgressbarConfig ) {

                this.checkUserId = db.collection('users').valueChanges();

               }

    errorMessage: string; successMessage: string;
    responseMessage = ''; responseMessageType = '';
    emailInput: string; passwordInput: string;
    isForgotPassword: boolean; userDetails: string;
    passwordError: string;
    allEmails: any [];

    public isInvestor = false;     public isMember = true;
      phoneNumber: any;   lastUserId: any;     checkEmail: any;



  ngOnInit() {
      this.resetForm();
      this.db.collection('users', reff =>
      reff.orderBy('created', 'desc').limit(1)).valueChanges().subscribe((val: any) => {
        val.map(response => this.lastUserId = response.id);
      });

  }
    // show message*
   showMessage(type, msg) { this.responseMessageType = type;
                            this.responseMessage = msg;
                            setTimeout(() => { this.responseMessage = ''; }, 10000);
   }


  resetForm(form?: NgForm) {
    if (form != null) { form.resetForm(); }

    this.authService.formData = {
      id : null, firstname: '', lastname: '', email: '', password: '',
       mobile: null,  referral: null, isInvestor: false, isMember: false,
       created: null, payment: false, account: false, trade: false

    };
  }
  // investors
  formSubmit(form: NgForm) {
    const data = form.value;
    this.phoneNumber = data.mobile; const regEmail = data.email;
    const password = data.password; data.isInvestor = this.isInvestor;
    data.isMember = this.isMember;  data.created = new Date();


// search user email in database.
// tslint:disable-next-line: no-unused-expression
    this.db.collection('users', reff => {
        return reff.where('email', '==', regEmail);
      }).snapshotChanges().subscribe((res: any) => {
  res.map(element => this.checkEmail = element.payload.doc.data().email);


  // check if user already exist else create new user
  if (this.checkEmail === regEmail) {
    this.showMessage('danger', ' email has been taken...');

  } else if (this.checkEmail !== regEmail) {

    this.authService.createNewUser(regEmail, password);
    const userId = this.lastUserId + 1;
    data.id = userId;
    data.password = '##############';
    data.payment = false; data.active = false;
    this.authService.storeUserDetails(data);
    this.router.navigate(['/welcome']);
    // this.authService.sendEmailVerification();

      } else {
        console.log('error in registrtion..');
        this.showMessage('danger', 'Error in registration , please try again.');
      }
    }).closed;

  }

    testingClick() {
      this.allEmails.forEach( (x) => {
        console.log(x);
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

      const message = ' password not matched';
      this.passwordError = message;

    }
  }

  selectOption() {
   console.log('option is selected');
   const result = document.getElementById('inputGroupSelect') as HTMLInputElement;

   if (result.value == 'investor') {
     this.isInvestor = true;

     console.log('result from investor ' + this.isInvestor);
   } else {
     this.isMember = true;
     this.isInvestor = false;
   }
   console.log(result.value);
  }

  navigateToHome(){
    this.router.navigate(['/welcome']);
  }

  regSuccessful(content) {
    this.modalService.open(content);

  }



}
