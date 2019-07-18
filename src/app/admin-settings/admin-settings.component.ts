import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { async } from 'q';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent implements OnInit {

  constructor(private database: AngularFirestore ) { }

  ngOnInit() {

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
        return reff.where('amount','>', 0);
      }).get().toPromise().then(  docs => {
        docs.forEach(doc => {
          this.database.doc(`accounts/${doc.id}`).update({amount: 0}).then(()=>{
            console.log('all account set to zero successfully..');
          });
        });
      });

      }

}
