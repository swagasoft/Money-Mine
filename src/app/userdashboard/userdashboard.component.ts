import { AuthService } from './../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import {  Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.scss']
})
export class UserdashboardComponent implements OnInit, OnDestroy {
myAccountDetails$: any ;
loading: boolean;
$userProfile: any;
getProfile: any;
userAcountFiles: any;
getUser: string;
userAccountId: any;
doc_id: any;




  constructor(
    public userService: UsersService,
    private database: AngularFirestore,
    private authService: AuthService,
    private router: Router,
    private _flashMessagesService: FlashMessagesService) {
    this.getUser = localStorage.getItem('currentUserEmail');

    // get user account details in database..
    this.myAccountDetails$ = database.collection('accounts', ref => {
      return ref.where('email', '==', this.getUser); }).valueChanges();

    this.getProfile = database.collection('users', ref => {
        return ref.where('email', '==', this.getUser); }).valueChanges();


   }

  ngOnInit() {
    this.loading = true;
    this.alignWindow();
    this.myAccountDetails$.subscribe(response => {
      this.userAcountFiles = response;
      console.log(this.userAcountFiles);
    });
    console.log(this.getUser);

    this.database.collection('accounts',  reference => {
      return reference.where('email','==',  this.getUser)
    }).get().toPromise().then((doc)=>  {
      this.userAccountId = doc.docs['0'].id;
      this.loading = false;
    });

    this.getProfile.subscribe( response => {
      this.$userProfile = response;
    });

      // load script
    this.loadScript('../../assets/dash/vendor/bootstrap-4.1/popper.min.js');
    this.loadScript('../../assets/dash/vendor/animsition/animsition.min.js');
    this.loadScript('../../assets/dash/vendor/select2/select2.min.js');
    this.loadScript('../../assets/dash/js/main.js');
  }

   async cashOut() {
     this.loading = true;
     const collectionRef =  this.database.collection('accounts');
     await collectionRef.doc(this.userAccountId).get().toPromise().then((doc)=> {
     console.log(doc.data());
     this.doc_id = doc.id;
     const usrBalance = doc.data().balance;

     if(usrBalance > 0){
      this.database.doc(`accounts/${this.userAccountId}`).get().toPromise().then((values)=> {
        console.log(values.data());
        let newCashout = values.data().balance;
        let newDate = Date.now();
        let name = values.data().name;
        let email = values.data().email;

        this.database.collection('cashouts').add({name: name, email: email, cashout: newCashout, date: newDate}).then(()=> {
          this.database.doc(`accounts/${this.userAccountId}`).update({cashout: newCashout, balance: 0});
        });

      });
      this.loading = false;
      this._flashMessagesService.show(`Cashout of ${usrBalance} successful`,
         { cssClass: 'bg-success text-white font-weight-bold text-center', timeout: 3000 });

    } else {
      this._flashMessagesService.show('Your balance is too low!',
       { cssClass: 'text-center bg-danger text-white font-weight-bold z-index: 9999', timeout: 3000 });
       this.loading = false;
    }

   });


  }

  ngOnDestroy() {
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
  alignWindow(){
    this.router.events.subscribe((evt) => {
      if(!(evt instanceof NavigationEnd)){
        return ;
      }
      window.scrollTo(0, 0);
    });
  }


}
