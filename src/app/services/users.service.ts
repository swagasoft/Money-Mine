import { UserModel } from './../models/user-model.model';

import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AppUser } from '../models/app-user';
import { AngularFirestore } from '@angular/fire/firestore';
import { PaymentModel } from '../models/payment-model';
import { Account } from '../models/account';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  paymentData: PaymentModel;
  accountBalance: Account;
  userAccount: any;


  constructor(private db: AngularFireDatabase,
              private database: AngularFirestore) { }

form = new FormGroup({
  firstName : new FormControl(''),
  lastName: new FormControl(''),
  userName: new FormControl(''),
  email: new FormControl(''),
  phoneNumber: new FormControl(''),
  isMember: new FormControl(''),
  isInvestor: new FormControl('')
});

save(user: firebase.User) {

}

get(uid: string): AngularFireObject <AppUser> {
  return this.db.object('/users/' + uid);
}

// get users from database
getAllUsers(uid) {
  this.database.collection('users').snapshotChanges();
}

createNewUser(user: UserModel) {
return this.database.collection('users').add(user);
}

updateUser(user: UserModel) {
  delete user.id;
  this.database.doc('users/' + user.id).update(user);
}
deleteUser(userId: string) {
  this.database.doc('users/' + userId).delete();
}
findUser() {
// var userInfomation = this.db.colection("user");
// var query = userInfomation.where("state", "==", "CA");
}

async storeUserTransaction(transaction) {
  return this.database.collection('transactions/').add(transaction);
}
async createAccountBalance(balance) {
  return this.database.collection('accounts/').add(balance);
}

async updateAcountBalance(account) {
  this.database.doc('accounts/' + account).update(account);
}
 searchUserIfExist(identity) {
    this.database.collection('accounts', reff => {
      return reff.where('email', '==', identity);
    }).snapshotChanges().subscribe((res: any) => { res.map(element => console.log('froooo' ,element.payload.doc.data()));

});

}

deleteTranDetails(documentId){
  console.log('delete from  service')
return this.database.doc('transactions/'+ documentId).delete();
}

}
