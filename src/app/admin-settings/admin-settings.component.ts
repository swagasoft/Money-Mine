import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { async } from 'q';
import { NgForm } from '@angular/forms';
import { NumberValueAccessor } from '@angular/forms/src/directives';

export interface TradeProfit {
  amount: number;
  time: any;
}

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent implements OnInit {
trade: any;
profit: number;
userPercent = 20;
marketerPercent = 1;
  constructor(private database: AngularFirestore ) { }

  ngOnInit() {

this.trade = localStorage.getItem('trade');
parseInt(this.trade);


  }

 async pushMoneyToTrade() {
    console.log('you click ');

    this.database.collection('accounts', reff => {
      return reff.where('amount', '>', 0);
    }).get().toPromise().then(docs => {
      // console.log(docs)
      docs.forEach(doc => {
        const currTrading = doc.data().trading;
        const currAmount = doc.data().amount;
        const sum = currTrading + currAmount;

        this.database.doc(`accounts/${doc.id}`).update({trading: sum});
        console.log('money pushed to trade successfully..');
        });
        });

    await  this.database.collection('accounts', reff => {
        return reff.where('amount', '>', 0);
      }).get().toPromise().then(  docs => {
        docs.forEach(doc => {
          this.database.doc(`accounts/${doc.id}`).update({amount: 0}).then(() => {
            console.log('all account set to zero successfully..');
          });
        });
      });

      }

    async shareprofitToAll(form: NgForm) {
        console.log(this.profit);
        this.database.collection('accounts', ref => {
        return ref.where('trading', '>', 0);
      }).get().toPromise().then(docs => {
        docs.forEach(doc => {
          const trading = doc.data().trading;
          let userBalanceTrade = doc.data().trading;
          const calculate =  ( this.profit / 100 * trading);

          const mainProfit = (calculate + trading);

          // calculate percentages...
          const userProfit = (this.userPercent / 100 * calculate);

          // marketers profit
          const marketerProfit = (this.marketerPercent / 100 * calculate);

            //  admin profit
          let adminProfit = calculate - (marketerProfit + userProfit);

          // add user balance
          let totalUserBalance = userBalanceTrade + userProfit;



          this.database.doc(`accounts/${doc.id}`).update({trading: totalUserBalance, profit: userProfit}).then(() => {
            console.log('user has been has been paid...');
          });

          // profit money-mine account
          this.database.doc(`accounts/irBSXMc7evREENKZbNNp`).update({profit: adminProfit}).then(()=> {
            console.log('admin profit paid successfully');
          });



        });
      }).then(async ()=> {
       await console.log('profit  splited to all various account successfully...');
      });
      }

}
