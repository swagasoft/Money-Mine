import { UsersService } from './../services/users.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';

interface Cashout {
  amount: number;
  email: string;
}

const CASHOUT: Cashout[] = [
  {
    amount: 0,
    email:  null,
  }
];

@Component({
  selector: 'app-user-cashout',
  templateUrl: './user-cashout.component.html',
  styleUrls: ['./user-cashout.component.scss']
})
export class UserCashoutComponent implements OnInit {
  cashUsers: any;
  allCashout: any;

  constructor(
    private database: AngularFirestore,
    private _flashMessageService: FlashMessagesService,
    private userService: UsersService
    ) { }

  ngOnInit() {

    this.database.collection('accounts', reff => {
      return reff.where('cashout','>', 0);
    }).snapshotChanges().subscribe((response: any)=> {
      this.allCashout = response.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data(),
        } as Cashout;
      })
    });
  }

  payUser(id, user, money){
this.userService.setCashoutTozero(id, user, money);
this._flashMessageService.show(`${user}  process sucessful..`,
{ cssClass: 'alert-success', timeout: 5000 });


  }

}
