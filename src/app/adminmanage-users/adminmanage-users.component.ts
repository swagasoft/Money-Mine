import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-adminmanage-users',
  templateUrl: './adminmanage-users.component.html',
  styleUrls: ['./adminmanage-users.component.scss']
})
export class AdminmanageUsersComponent implements OnInit, OnDestroy {
customerAccount: any;
customerDetails: any;
customerPayouts : any;
bankDetails: any;
showAcountForm: boolean;
loading: boolean;
userEmail : string;
databaseId: string;
searchInput: string;
accountSub: any;
emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



  constructor(private authService: AuthService, private database: AngularFirestore) { }

  model = { email: '' };

  updateAccount = {
    account: null,
  }

  ngOnInit() {
    this.loadScript('../../assets/dash/vendor/bootstrap-4.1/popper.min.js');
    this.loadScript('../../assets/dash/vendor/animsition/animsition.min.js');
    this.loadScript('../../assets/dash/vendor/select2/select2.min.js');
    this.loadScript('../../assets/dash/js/main.js');
    this.showAcountForm = false;
    this.loading = false;

  }
  ngOnDestroy(){

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

  async searchUser(user){
    this.loading = true;
    const searchInput = user.value.email.toLowerCase();
    console.log(searchInput);

    this.accountSub = this.database.collection('accounts', ref => {
     return ref.where('email', '==', searchInput);
  }).valueChanges().subscribe( (doc) => {
    this.customerAccount = doc;
    console.log('IMPUT 1 =',searchInput);
  });

    await this.database.collection('users', ref => {
      return ref.where('email','==', searchInput);
    }).valueChanges().subscribe((doc) => {
      this.customerDetails = doc;
      this.userEmail = doc['0']['email'];
      console.log('IMPUT 22 =',searchInput);
    });

    await this.database.collection('transactions', ref => {
      return ref.where('email','==', searchInput);
    }).valueChanges().subscribe((doc) => {
      this.loading = false;
      console.log('IMPUT 33 =',searchInput);
    });

    await this.database.collection('bank-details', ref => {
      return ref.where('user','==', searchInput);
    }).valueChanges().subscribe((doc) => {
      this.bankDetails = doc;
      console.log('IMPUT 44 =',searchInput);
    });

    this.setFormTNull();

  }

  setFormTNull(){
    this.searchInput = '';
   }

  updateUser(form){
    console.log(form.value.account);
    this.loading = true;
    const amoountUpdate = form.value.account;
    setTimeout(()=> { this.showAcountForm = false}, 2000);

    let doc = this.database.collection('accounts', ref => ref.where('email', '==', this.userEmail));
    doc.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        this.databaseId = id;

        return { id, ...data };
      }))).subscribe((_doc: any) => {
        // update payment record
        if(_doc){
       this.database.doc(`accounts/${this.databaseId}`).update({amount: amoountUpdate, created: new Date()});
        }else{
          return null;
        }
      });
    this.loading = false;
  }

  clickEdit(){
    this.showAcountForm = true ;
    console.log('click edit...');
  }
}

