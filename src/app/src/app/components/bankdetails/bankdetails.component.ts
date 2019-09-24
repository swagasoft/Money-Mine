import { AuthService } from './../../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FlashMessagesService } from 'angular2-flash-messages';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bankdetails',
  templateUrl: './bankdetails.component.html',
  styleUrls: ['./bankdetails.component.scss']
})
export class BankdetailsComponent implements OnInit {
  accountNumber: number;
  bankName: string;
  AccountName: string;
  user: string;
  getBankDocument: any;
  $userBank: any;
  bankDetailsID : any;
  hide_form: boolean;

  constructor( private database: AngularFirestore,
               private authService: AuthService,
               private _flashMessageService: FlashMessagesService,
               private userservice: UsersService) {

   }

  ngOnInit() {
         // load script
    this.loadScript('../../assets/dash/vendor/bootstrap-4.1/popper.min.js');
    this.loadScript('../../assets/dash/vendor/animsition/animsition.min.js');
    this.loadScript('../../assets/dash/vendor/select2/select2.min.js');
    this.loadScript('../../assets/dash/js/main.js');
    this.user = localStorage.getItem('currentUserEmail');

    this.getBankDocument = this.database.collection('bank-details', ref => {
          return ref.where('user', '==', this.user); }).valueChanges().subscribe( res =>{
            this.$userBank = res;
          }

            );

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
  createBankIfNotExist(accountName, bank, number , userEmail) {
    // const userBankDetails = this.database.collection('bank-details', reff => reff.where('user','==', this.user));
    if (this.$userBank.length !== 0) {
      this._flashMessageService.show(`cannot update details...`,
      { cssClass: 'bg-white text-danger  text-center font-weight-bold', timeout: 5000 });
    } else {

      this._flashMessageService.show(`new user ...`,
      { cssClass: 'bg-white text-danger  text-center font-weight-bold', timeout: 5000 });
      this.database.collection('bank-details').add({
        bank: bank,
        accountName: accountName,
        accountNumber: number,
        user: this.user
      }).then((doc) => {
        this._flashMessageService.show(`  details saved...`,
        { cssClass: 'bg-white text-success  text-center font-weight-bold', timeout: 5000 });
      });
    }


 }


  completeDetails(){
   this.createBankIfNotExist(this.AccountName, this.bankName,
       this.accountNumber, this.user);
  }

}

