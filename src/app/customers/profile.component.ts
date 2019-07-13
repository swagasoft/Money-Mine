import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class UserProfileComponent implements OnInit {
$userProfile:any;
getUser: string;
getProfile: any;

  constructor(public userService: UsersService,  private database: AngularFirestore) {
    this.getUser = localStorage.getItem('currentUserEmail');

    this.getProfile = database.collection('users', ref => {
      return ref.where('email', '==', this.getUser); }).valueChanges();

   }


  ngOnInit() {
    this.getProfile.subscribe( response => {
      this.$userProfile = response;
    });
  }

}
