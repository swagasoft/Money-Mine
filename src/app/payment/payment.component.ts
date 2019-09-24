import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd } from '@angular/router';
import { async } from '@angular/core/testing';
import { pipe, Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { PaymentModel } from '../models/payment-model';
import { AngularFireAuth } from 'angularfire2/auth';
import { element } from '@angular/core/src/render3';
import { map, first } from 'rxjs/operators';
import { __values } from 'tslib';


export interface Item { amount: number; email: string; ref: number; }

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

export class PaymentComponent implements OnInit, OnDestroy {

  items: Observable<any []>;
  myAccountDetails: any;
  emailInput: string;   amountInput: string ;
  refInput: string;  newAmount: string;
  exactAmount: string;  $currentUser: firebase.User;
   currentUserEmail: string;
  transactionValues: PaymentModel[];
  accountId: string;
    databaseAcount: any;
    databaseId: string;



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
              private authservice: AuthService,
              private db: AngularFirestore) {

        this.myAccountDetails = userService.getUserAccount;

        this.databaseAcount = userService.currentAmount;

        // this.myAccountDetails.subscribe((res)=> res.map(element => console.log(element.payload.doc.data)));
        // setTimeout(() => {
        //       console.log(this.databaseAcount );
        //     }, 3000);

        config.backdrop = 'static';
        config.keyboard = false;
   }

  ngOnInit() {
       // load script
       this.loadScript('../../assets/dash/vendor/bootstrap-4.1/popper.min.js');
       this.loadScript('../../assets/dash/vendor/animsition/animsition.min.js');
       this.loadScript('../../assets/dash/vendor/select2/select2.min.js');
       this.loadScript('../../assets/dash/js/main.js');

       this.router.events.subscribe((evt) => {
        if(!(evt instanceof NavigationEnd)){
          return ;
        }

        window.scrollTo(0,0);
      });


       this.afAuth.authState.subscribe( x => this.$currentUser = x);
       this.generateRef();
       const getUser = localStorage.getItem('currentUserEmail');
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
  });

  });

// get user account balance...
       this.db.collection('accounts', reff => {
    return reff.where('email', '==', this.currentUserEmail);
  }).snapshotChanges().subscribe((res: any) => {
res.map(element => this.databaseAcount = element.payload.doc.data().amount);


  });
}
  ngOnDestroy() {

  }
  logout(){
    this.authservice.logout();
  }

  testingBtn(){
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



  open(content) {
    this.modalService.open(content);
  }

  paymentDone($event) {
    const tranxData =  this.userService.paymentData = {
      id: null,
      amount: this.exactAmount, email: this.currentUserEmail, created:  new Date(),
      tranxId: $event.trans, tranxRef: $event.trxref, message: $event.message, status: $event.status
    };


    // sum previous account amount with new payment
    let _value = this.exactAmount + this.databaseAcount;

    //  save user transaction details
    this.userService.storeUserTransaction(tranxData);
    this.generateRef();
    this.amountInput = '';

    let doc = this.db.collection('accounts', ref => ref.where('email', '==', this.currentUserEmail));
    doc.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        this.databaseId = id;

        return { id, ...data };
      }))).pipe(first()).subscribe((_doc: any) => {
        // update payment record
        if(_doc){
       this.db.doc(`accounts/${this.databaseId}`).update({amount: _value, created: new Date()});
        }else{
          return null;
        }
      });
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


refreshTable() {
  // read all transaction belonging to current user.
  console.log('refreshing table content');
  const getUser = localStorage.getItem('currentUserEmail');
  this.db.collection('transactions' , reff => {
    return reff.where('email', '==', getUser);
  }).snapshotChanges().subscribe((response: any) =>  {
  this.transactionValues = response.map(item => {
    return {
      id: item.payload.doc.id,
      ...item.payload.doc.data(),
    } as PaymentModel;
  });

  });
}

deleteTranx(fieId) {
  console.log('field', fieId);
  this.userService.deleteTranDetails(fieId);
}


}
