import { AuthService } from './../services/auth.service';
import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admintransaction',
  templateUrl: './admintransaction.component.html',
  styleUrls: ['./admintransaction.component.scss']
})
export class AdmintransactionComponent implements OnInit {
  totalAccount: number;
  TraddingAmount: number;
  totalProfit: number;
  numberofDeposit: number;
  totalTraders: number;
  totalProfitAccount: number;
  constructor( private database: AngularFirestore ,
    private authservice: AuthService) {

   }


  ngOnInit() {
    this.loadScript('../../assets/dash/vendor/bootstrap-4.1/popper.min.js');
    this.loadScript('../../assets/dash/vendor/animsition/animsition.min.js');
    this.loadScript('../../assets/dash/vendor/select2/select2.min.js');
    this.loadScript('../../assets/dash/js/main.js');


    let sumAmount = 0;
    this.database.collection('accounts', reff => {
      return reff.where('amount', '>', 0); }).valueChanges().subscribe((val) => {
        this.numberofDeposit =  val.length;
        val.map(res => sumAmount += res['amount']);
      });

    let tradeAmount = 0;
    this.database.collection('accounts', reff => {
    return reff.where('trading', '>', 0); }).valueChanges().subscribe((val) => {
      this.totalTraders = val.length;
      val.map(res => tradeAmount += res['trading']);
    });

    let usersProfit = 0;
    this.database.collection('accounts', reff => {
    return reff.where('profit', '>', 0); }).valueChanges().subscribe((val) => {
      this.totalProfitAccount = val.length;
      val.map(res => usersProfit += res['profit']);
    });



    setTimeout(() => {
      this.TraddingAmount = tradeAmount;
      this.totalAccount = sumAmount;
      this.totalProfit = usersProfit;
      localStorage.setItem('trade', this.TraddingAmount.toString());

    }, 2000);
  }

  getAccount(){

  }
  logout(){
    this.authservice.logout();
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




}
