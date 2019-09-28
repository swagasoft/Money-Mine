import { AuthService } from './../services/auth.service';
import { AdminServiceService } from './../services/admin-service.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { async } from 'q';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, NavigationEnd } from '@angular/router';

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
allTrade: any;
profit: number;
userPercent = 20;
marketerPercent = 1;
tradeCount: any;
loader: boolean;
adminId = 'nLcos2JnrkuXt6nb9xOL';

  constructor(
    private database: AngularFirestore,
    private authService: AuthService,
    private adminService: AdminServiceService,
    private router: Router,
    private _flashMessage: FlashMessagesService
      ) {
   }

  ngOnInit() {

  console.log(this.adminId);
  this.database.collection('admin').valueChanges().subscribe((val)=> {
          console.log(val);
          this.tradeCount = val['0']['trade_count'];
    });


       // load script
  this.loadScript('../../assets/dash/vendor/bootstrap-4.1/popper.min.js');
  this.loadScript('../../assets/dash/vendor/animsition/animsition.min.js');
  this.loadScript('../../assets/dash/vendor/select2/select2.min.js');
  this.loadScript('../../assets/dash/js/main.js');
  this.loader = false;

  let trade = 0;
  this.database.collection('accounts', reff => {
    return reff.where('trading', '>', 0); }).valueChanges().subscribe((val) => {
      val.map(res => trade  += res['trading']);
    });

  setTimeout(() => {
      this.allTrade = trade;
    }, 2000);

  this.alignWindow();

  }

  alignWindow() {
    this.router.events.subscribe((evt) => {
      if(!(evt instanceof NavigationEnd)){
        return ;
      }
      window.scrollTo(0, 0);
    });
  }

  async pushMoneyToTrade() {
    this.loader = true;
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
    this.loader = false;

      }


  async closeAllTrade() {
    this.loader = true;
    console.log('close all trade');
    this.database.collection('accounts', reff => {
      return reff.where('trading', '>', 0);
    }).get().toPromise().then(docs => {
      docs.forEach(doc => {
        const currTrading = doc.data().trading;
        const currprofit = doc.data().profit;
        const sum = currTrading + currprofit;

        this.database.doc(`accounts/${doc.id}`).update({amount: sum});
        console.log('user paid out successfully..');
        });
        });

    await  this.database.collection('accounts', reff => {
        return reff.where('trading', '>', 0);
      }).get().toPromise().then(  docs => {
        docs.forEach(doc => {
          this.database.doc(`accounts/${doc.id}`).update({trading: 0, profit: 0}).then(() => {
            console.log('all account set to zero successfully..');
          });
        });
      });

    this.setAdminCounterToZero();
    this.loader = false;

      }


      async shareprofitToAll(form: NgForm) {
        console.log(this.tradeCount);

        let profit = form.value.profit;

        if(this.tradeCount == 15){
          this._flashMessage.show(`Trade cannot be more than %15`,
          { cssClass: 'text-center bg-danger text-white  font-weight-bold', timeout: 4000 });

        }else{

          if ((profit + this.tradeCount) > 15) {

            this._flashMessage.show(`Trade must be equal to %15`,
          { cssClass: 'text-center bg-danger text-white  font-weight-bold', timeout: 4000 });

          } else {
            this.loader = true;
            const countSum = form.value.profit + this.tradeCount;

                      // update admin counter
            await this.database.doc(`admin/${this.adminId}`).update({trade_count:countSum });

            this.database.collection('accounts', ref => {
            return ref.where('trading', '>', 0);
          }).get().toPromise().then(docs => {
            docs.forEach(doc => {
              const trading = doc.data().trading;
              const acrued = doc.data().profit;

              const calculateProfit =  ( this.profit / 100 * trading);


              // const mainProfit = (calculateProfit + trading);
              // calculate percentages...
              // const userProfit = (this.userPercent / 100 * calculateProfit);

              // marketers profit
              // const marketerProfit = (this.marketerPercent / 100 * calculateProfit);

                //  admin profit
              // let adminProfit = calculateProfit - (marketerProfit + userProfit);

              // add user balance
              let totalUserAcrued = acrued + calculateProfit;

              this.database.doc(`accounts/${doc.id}`).update({ profit: totalUserAcrued}).
              then(() => {
                console.log('user has been has been paid...');
              });

            });
          }).then(async ()=> {
           console.log('profit  splited to all various account successfully...');
           this.loader = false;
          });
          }

        }

      }
      setAdminCounterToZero(){
        console.log(this.adminId);
        this.database.doc(`admin/${this.adminId}`).update({trade_count: 0});
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
