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
  TraddingAmount: number;
  totalProfit: number;
  constructor( private database: AngularFirestore ) {

   }


  ngOnInit() {

    let sumAmount = 0;
    this.database.collection('accounts', reff => {
      return reff.where('amount', '>', 0); }).valueChanges().subscribe(val => {
        val.map(res => sumAmount += res['amount']);
      });

    let tradeAmount = 0;
    this.database.collection('accounts', reff => {
    return reff.where('trading', '>', 0); }).valueChanges().subscribe(val => {
      val.map(res => tradeAmount += res['trading']);
    });

    let usersProfit = 0;
    this.database.collection('accounts', reff => {
    return reff.where('profit', '>', 0); }).valueChanges().subscribe(val => {
      val.map(res => usersProfit += res['profit']);
    });

    setTimeout(() => {
      this.TraddingAmount = tradeAmount;
      this.totalAccount = sumAmount;
      this.totalProfit = usersProfit;
      localStorage.setItem('trade', this.TraddingAmount.toString());

      console.log('trading', this.TraddingAmount);
      console.log('amount  ', this.totalAccount);
    }, 2000);
  }

  getAccount(){

  }




}
