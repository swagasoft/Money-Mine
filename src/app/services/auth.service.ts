import { CurrentUserIde } from './auth.service';
import { UserModel } from './../models/user-model.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable, OnInit } from '@angular/core';
import { Observable, of, from, NEVER } from 'rxjs';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import * as firebase  from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { PaymentModel } from '../models/payment-model';
import { ReturnStatement } from '@angular/compiler';

export interface CurrentUserIde { id: string; }

@Injectable({
  providedIn: 'root'
})
export class AuthService  implements OnInit {
  formData: UserModel;
  user$: Observable <firebase.User>;
  userId$: CurrentUserIde;
  loginError: any;

  constructor(
               public angularFireAuth: AngularFireAuth,
               private firestore: AngularFirestore,
               private router: Router,
               private db: AngularFireDatabase,
               public route: ActivatedRoute
               )  {
          this.user$ = angularFireAuth.authState;

  }

  async storeUserDetails(credentials) {
    return this.firestore.collection('users').add(credentials);

  }

 async createNewUser(email: string, password: string) {
    return await this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password).then( value => {
      this.router.navigate(['/welcome']);
      this.sendEmailVerification();

    }).catch(err => {
    });

  }

  async sendEmailVerification() {
    return await this.angularFireAuth.auth.currentUser.sendEmailVerification();
  }


  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.angularFireAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }



  async logout() {
     window.localStorage.clear();
     window.localStorage.removeItem('currentUserEmail');

    this.router.navigate(['/login']);
     return await this.angularFireAuth.auth.signOut();
  }


  isUserLoggedIn() {
    return JSON.parse(localStorage.getItem('user'));

  }

ngOnInit() {


}



}


