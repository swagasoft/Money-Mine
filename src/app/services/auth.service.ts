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
  getUser: any;
  formData: UserModel;
  user$: Observable <firebase.User>;
  userId$: CurrentUserIde;
  collectionRef: any;
  confirmAdmin: any;
  loginError: any;

  constructor( public angularFireAuth: AngularFireAuth, private firestore: AngularFirestore,
               private router: Router, private db: AngularFireDatabase,
               public route: ActivatedRoute)  {
          this.user$ = angularFireAuth.authState;
          this.getUser = localStorage.getItem('currentUserEmail');

          // read user to use for admin property
          this.collectionRef = firestore.collection('users', reff => {
          return  reff.where('email', '==', this.getUser);
          }).valueChanges();

          this.collectionRef.subscribe(val => this.confirmAdmin =  val[0]['isAdmin']);

          setTimeout(()=> {
            console.log(this.confirmAdmin);
          },3000);

  }

  async login(email: string, password: string) {
    const returnUrl  = this.route.snapshot.queryParamMap.get('returnUrl') || '/welcome';

    return await this.angularFireAuth.auth.signInWithEmailAndPassword(email, password).then(value => {
      this.router.navigateByUrl(returnUrl);
    }).catch(error => {
      // console.log('error in login', error);
      this.loginError = error;
    });

  }

  async storeUserDetails(credentials) {
    return this.firestore.collection('users').add(credentials);

  }

 async createNewUser(email: string, password: string) {
    return await this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password).then( value => {
      console.log('registration successful', value);
      this.router.navigate(['/welcome']);
      this.sendEmailVerification();

    }).catch(err => {
      console.log('registration error', err);
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

     console.log(localStorage.getItem('currentUserEmail'));
     return await this.angularFireAuth.auth.signOut();
  }


  isUserLoggedIn() {
    return JSON.parse(localStorage.getItem('user'));
  }

ngOnInit() {


}



}


