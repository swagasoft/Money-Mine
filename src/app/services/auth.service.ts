import { Router, ActivatedRoute } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable <firebase.User>;

  constructor(
    public angularFireAuth: AngularFireAuth,
    public router: Router,
    private route: ActivatedRoute
  ) {
 this.user$ = angularFireAuth.authState;

  }


  async login(email: string, password: string) {
    let returnUrl =  this.route.snapshot.queryParamMap.get('retuenUrl') || '/';
    localStorage .setItem('returnUrl', returnUrl);
    return await this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);

  }

  async register(email: string,  password: string) {
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





}


