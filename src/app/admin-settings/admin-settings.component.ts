import { AuthService } from './../services/auth.service';
import { AdminServiceService } from './../services/admin-service.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { async } from 'q';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

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
tradeCount: any;
showProgress: boolean;
  constructor(
    private database: AngularFirestore,
    private authService: AuthService,
    private adminService: AdminServiceService,
    private _flashMessagesService: FlashMessagesService
      ) {
   }

  ngOnInit() {

       // load script
       this.loadScript('../../assets/dash/vendor/bootstrap-4.1/popper.min.js');
       this.loadScript('../../assets/dash/vendor/animsition/animsition.min.js');
       this.loadScript('../../assets/dash/vendor/select2/select2.min.js');
       this.loadScript('../../assets/dash/js/main.js');
       this.showProgress = false;
       this.trade = localStorage.getItem('trade');
       parseInt(this.trade);


  }

  async pushMoneyToTrade() {
    this.showProgress = true;
    console.log('you click ');

    this.database.collection('accounts', reff => {
      return reff.where('amount', '>', 0);
    }).get().toPromise().then(docs => {
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
      this.showProgress = false;

      }


      async shareprofitToAll(form: NgForm) {
        this.showProgress = true;
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

          this.database.doc(`accounts/${doc.id}`).update({trading: totalUserBalance, profit: userProfit}).
          then(() => {
            console.log('user has been has been paid...');
          });

          // profit money-mine account
          this.showProgress =true;
          this.database.doc(`accounts/irBSXMc7evREENKZbNNp`).update({profit: adminProfit}).then(()=> {
            console.log('admin profit paid successfully');
            this.showProgress = false;

          });

        }, this.showProgress = false );
      }).then(async ()=> {
       await console.log('profit  splited to all various account successfully...');


      });

      }


      loadScript(url: string){
        const body = <HTMLDivElement> document.body;
        const script = document.createElement('script');
        script.innerHTML = '';
        script.src = url;
        script.async = false;
        script.defer = true;
        body.appendChild(script);
      }
      logout(){
        this.authService.logout();
      }




}
