import { UserModel } from './../models/user-model.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {User} from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { PaymentModel } from '../models/payment-model';


@Injectable({
  providedIn: 'root'
})
export class AuthService  implements OnInit{

  formData: UserModel;
  user$: Observable <User>;

  constructor(
    public angularFireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private db: AngularFireDatabase,
    public route: ActivatedRoute
  ) {
 this.user$ = angularFireAuth.authState;

  }


  async login(email: string, password: string) {
    return await this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);

  }

  async storeUserDetails(credentials) {
    return this.firestore.collection('users').add(credentials);

  }


 async createNewUser(email: string, password: string){
    return await this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);

  }

  async sendEmailVerification() {
    return await this.angularFireAuth.auth.currentUser.sendEmailVerification();
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.angularFireAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout() {
    return await this.angularFireAuth.auth.signOut();
  }


  isUserLoggedIn() {
    return JSON.parse(localStorage.getItem('user'));
  }

ngOnInit(){


}



}


