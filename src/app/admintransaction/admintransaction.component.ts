import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admintransaction',
  templateUrl: './admintransaction.component.html',
  styleUrls: ['./admintransaction.component.scss']
})
export class AdmintransactionComponent implements OnInit {
  currentJustify = 'fill';
  totalAccount: number;
  newVal: any;
  constructor( private database: AngularFirestore ) {

   }


  ngOnInit() {

    let sumAmount = 0;
   const userDoc = this.database.collection('accounts', reff => {
    return reff.where('amount', '>', 0); }).valueChanges().subscribe(val => {
      val.map(res => sumAmount += res['amount']);
    });

    setTimeout(()=> {
    console.log(sumAmount);
    this.totalAccount = sumAmount;

    }, 3000);
  }

  getAccount(){
    let sumAmount = 0;
    const userDoc = this.database.collection('accounts', reff => {
     return reff.where('amount', '>', 0); }).valueChanges().subscribe(val => {
       val.map(res => sumAmount += res['amount']);
     });
     setTimeout(()=> {
     this.totalAccount = sumAmount;

     }, 2000)
  }
  // refreshAccount(){
  //   let i = 0;
  //   while (i >= 0){
  //     setTimeout(()=> {
  //       console.log('fire every 3 secc')
  //       this.getAccount();
  //     }, 3000);
  //   }
  // }



}
