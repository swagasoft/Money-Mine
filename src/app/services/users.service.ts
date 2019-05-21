import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private db: AngularFireDatabase) { }

save(user: firebase.User){
  this.db.object('/users/'+ user.uid).update({
    name: user.displayName,
    email: user.email
  });
}

get(uid: string): AngularFireObject <AppUser> {
  return this.db.object('/users/' + uid);
}
}
