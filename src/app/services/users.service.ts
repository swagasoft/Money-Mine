import { UserModel } from './../models/user-model.model';

import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AppUser } from '../models/app-user';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { PaymentModel } from '../models/payment-model';
import { Account } from '../models/account';
import { first, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface AmountModel {  amount: number; email: string; creates: any; }

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  paymentData: PaymentModel;
  amountData: AmountModel[];
  accountBalance: Account;
  getUserAccount: any;
  $user: any;
  currentAmount: number;
  profile: any;
  userAcount: any;
  getUser: string;


  constructor(public authService: AuthService,  private database: AngularFirestore) {

    this.$user = authService.angularFireAuth.authState;
    this.getUser = localStorage.getItem('currentUserEmail');

    this.getUserAccount = database.collection('accounts', ref => {
             return ref.where('email', '==', this.getUser); }).valueChanges();

                  // get user profile
    this.profile = database.collection('users', reff =>
                  reff.where('email', '==', this.getUser)).valueChanges();

                // find current user account balance
    this.database.collection('accounts' , reff => {
                    return reff.where('email', '==', this.getUser);
                  }).snapshotChanges().subscribe((response: any) =>  {
                  this.userAcount = response.map(item => {
                    return {
                      id: item.payload.doc.id,
                      ...item.payload.doc.data(),
                    } as AmountModel;
                  });

                  });

              }

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

get(uid: string): AngularFirestoreDocument <AppUser> {
  console.log('uid', uid);
  return this.database.collection('users').doc(uid);
}


// get users from database
getAllUsers(uid) {
  this.database.collection('users/' + uid).snapshotChanges();
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


async storeUserTransaction(transaction) {
  return this.database.collection('transactions/').add(transaction);
}

async createAccountBalance(balance) {
  return this.database.collection('accounts/').add(balance).then( val => {
    console.log('new account created', val);
  }).catch(error => {
    console.log('error creating new account' + error);
  });
}

async updateAcountBalance(account) {
  this.database.doc('accounts/' + account).update(account).then(val => {
    console.log('account updated succesful', +val);
  }).catch(error => { console.error('error in update' + error); });
}

updateBankIfNotExist(accountName, bank, number, userEmail){
   const userBankDetails = this.database.collection('bank-details', reff => reff.where('user','==', userEmail));
   if(userBankDetails){
   console.log('BANK EXIST');
 }else{
  console.log('BANK not EXIST');
  this.database.collection('bank-details').add({
    account: accountName,
    bank_name: bank,
    bank_number: number,
    user: userEmail

  }).then((doc)=> {
    console.log(doc, 'CREATED SUCCESSFUL');
  });

 }
}

 searchUserIfExist(identity) {
    this.database.collection('accounts', reff => {
      return reff.where('email', '==', identity);
    }).snapshotChanges().subscribe((res: any) => { res.map(element => console.log('froooo' , element.payload.doc.data()));

});

}

deleteTranDetails(documentId) {
  console.log('delete from  service');
  return this.database.doc('transactions/' + documentId).delete();
}

async setCashoutTozero(id, user, money){
  this.database.collection('payment').add({user,amount: money, date: new Date() });
  return this.database.doc('accounts/'+ id).update({cashout: 0});


}


}
