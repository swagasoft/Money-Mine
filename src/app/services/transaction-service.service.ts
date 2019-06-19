import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class TransactionServiceService {

  constructor(  private afAuth: AngularFireAuth) { }


  // refreshTransaction(){
  //   this.afAuth.authState.subscribe( x => this.$currentUser = x);
  //   this.generateRef();
  //      this.amountInput ;
  //   this.tableView = false;
  //   let getUser = localStorage.getItem('currentUserEmail');
  //   this.currentUserEmail = getUser;

  //   this.db.collection('transactions' , reff => {
  //     return reff.where('email', '==', getUser);
  //   }).snapshotChanges().subscribe((response: any) =>  {
  //     response.map(element =>   this.transactionValues.push(element.payload.doc.data()));
  //   });
  // }
}
