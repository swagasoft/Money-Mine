import { AngularFirestore } from '@angular/fire/firestore';
import {  Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.scss']
})
export class UserdashboardComponent implements OnInit, OnDestroy {
myAccountDetails$: any ;
$userProfile: any;
getProfile: any;
userAcountFiles: any;
getUser: string;

  constructor(public userService: UsersService, private database: AngularFirestore) {
    this.getUser = localStorage.getItem('currentUserEmail');

    // get user account details in database..
    this.myAccountDetails$ = database.collection('accounts', ref => {
      return ref.where('email', '==', this.getUser); }).valueChanges();

    this.getProfile = database.collection('users', ref => {
        return ref.where('email', '==', this.getUser); }).valueChanges();


   }

  ngOnInit() {
    this.myAccountDetails$.subscribe(response => {
      this.userAcountFiles = response;
    });



    this.getProfile.subscribe( response => {
      this.$userProfile = response;
    });


  }
  ngOnDestroy() {

  }


}
