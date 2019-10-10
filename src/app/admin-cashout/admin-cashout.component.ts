import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

interface CASHOUT {
  amount: number;
  status: string;
  date: number;
}


@Component({
  selector: 'app-admin-cashout',
  templateUrl: './admin-cashout.component.html',
  styleUrls: ['./admin-cashout.component.scss']
})
export class AdminCashoutComponent implements OnInit {
allCashout: any;
  constructor(private authService: AuthService, private database: AngularFirestore) { }

  ngOnInit() {
   setTimeout(()=> {
     console.log(this.allCashout);
   }, 4000);

   this.getCashout();
    this.loadScript('../../assets/dash/vendor/bootstrap-4.1/popper.min.js');
    this.loadScript('../../assets/dash/vendor/animsition/animsition.min.js');
    this.loadScript('../../assets/dash/vendor/select2/select2.min.js');
    this.loadScript('../../assets/dash/js/main.js');
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

    //  readAllCashout(){
    //   let cashout = 0;
    //   this.database.collection('accounts', reff => {
    //     return reff.where('cashout', '>', 0); }).valueChanges().subscribe((val) => {
    //       val.map(res =>  this.allCashout  = res);
    //     });

    //     setTimeout(()=> {
    //       console.log(this.allCashout);
    //     }, 3000);
    //  }

     getCashout(){
         // read all cashout
         this.database.collection('accounts' , reff => {
          return reff.where('cashout', '>', 0);
        }).snapshotChanges().subscribe((response: any) =>  {
        this.allCashout = response.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data(),
          } as CASHOUT;
        });

        });
     }

    async payoutUser(id, email, amount){
       console.log(id);
       await this.database.doc(`accounts/${id}`).update({cashout:0});
       await this.database.collection('payout').add({amount:amount, email:email, id:id}).then((doc)=> {
         console.log('payour successful...')
       });
     }





}
