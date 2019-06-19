import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { pipe } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { PaymentModel } from '../models/payment-model';
import { AngularFireAuth } from 'angularfire2/auth';
import { element } from '@angular/core/src/render3';

interface Payment {
  amount: number;
  status: string;
  date: number;
}


const PAYMENT: Payment[] = [
  {
    amount: 0,
    date:  null,
    status: 'null'
  }
];

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})

export class PaymentComponent implements OnInit {
  emailInput: string;   amountInput: string ;
  refInput: string;  newAmount: string;
  exactAmount: string;  $currentUser: firebase.User;
  tableView: boolean;   currentUserEmail: string;
  transactionValues : PaymentModel[];
    identity: string; accountId: string;  accountColRef: any;



  page = 1;
  pageSize = 4;
  collectionSize = PAYMENT.length;

  get userPayments(): Payment[] {
    return PAYMENT
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  constructor(private modalService: NgbModal, config: NgbModalConfig,
              private router: Router , private userService: UsersService,
              private afAuth: AngularFireAuth,
              private db: AngularFirestore) {

                config.backdrop = 'static';
                config.keyboard = false;


   }

  ngOnInit() {


    this.afAuth.authState.subscribe( x => this.$currentUser = x);
    this.generateRef();
     this.amountInput ;
    this.tableView = false;
    let getUser = localStorage.getItem('currentUserEmail');
    this.currentUserEmail = getUser;

    // read all transaction belonging to current user.
    this.db.collection('transactions' , reff => {
    return reff.where('email', '==', getUser);
  }).snapshotChanges().subscribe((response: any) =>  {
  this.transactionValues = response.map(item => {
    return {
      id: item.payload.doc.id,
      ...item.payload.doc.data(),
    } as PaymentModel;
  })

  });
  }


  open(content) {
    this.modalService.open(content);
  }

  paymentDone($event) {
    const tranxData =  this.userService.paymentData = {
      id:null,
      amount: this.exactAmount, email: this.currentUserEmail, created:  new Date(),
      tranxId: $event.trans, tranxRef: $event.trxref, message: $event.message, status:$event.status
    };

    const accountdata = this.userService.accountBalance = {
      email:this.currentUserEmail, amount: this.exactAmount, created: new Date(), tranxId: $event.trans
    }

    // update user account if exist
    this.db.doc('accounts/'+this.currentUserEmail).get().toPromise().then(docSnap => {
      if(docSnap.exists){
        console.log('account already exist');
      }else{
        this.db.collection('accounts').add(accountdata);
        console.log('account not exist !');
      }
    });

    // search user if exist then create new account
    this.userService.storeUserTransaction(tranxData);
    this.generateRef();
    this.amountInput = '';

  }
  paymentCancel() {
    console.log('you just cancel a payment!');
    this.emailInput = '';
    this.amountInput = '';
    this.generateRef();
    this.newAmount = (this.amountInput + '00');

  }

  paynow() {
    // collect exact inputed amount
    this.exactAmount = this.amountInput;
    this.newAmount = (this.amountInput + '00');
    this.amountInput = this.newAmount;

  }

  generateRef() {
    const  ref = '' + Math.floor((Math.random() * 1000000000) + 1); // gene
    this.refInput = ref;
  }


refreshTable(){
  // read all transaction belonging to current user.
  console.log('refreshing table content');
  let getUser = localStorage.getItem('currentUserEmail');
  this.db.collection('transactions' , reff => {
    return reff.where('email', '==', getUser);
  }).snapshotChanges().subscribe((response: any) =>  {
  this.transactionValues = response.map(item => {
    return {
      id: item.payload.doc.id,
      ...item.payload.doc.data(),
    } as PaymentModel;
  })

  });
}

deleteTranx(fileId){
  if(confirm('Are you sure you want to delete item ?')){
    this.userService.deleteTranDetails(fileId);
  }else{
    return;
  }


}


}
