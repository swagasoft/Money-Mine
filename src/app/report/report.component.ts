import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { Reports} from './Report';
import { AngularFirestore } from '@angular/fire/firestore';
declare var $: any;

interface REPORTS {
  amount: number;
  balance: number;
  cashout: number;
  acrued: number;
  name:  string;
  trading:  number;
  roll_over:  number;
  top_up:  number;


}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  reports$: Observable<Reports[]>;
  total$: Observable<number>;
  allReport: any;

  constructor( private authService : AuthService, private database: AngularFirestore,
              private router: Router
    ) { }

  ngOnInit() {
    this.loadScript('../../assets/dash/vendor/bootstrap-4.1/popper.min.js');
    this.loadScript('../../assets/dash/vendor/animsition/animsition.min.js');
    this.loadScript('../../assets/dash/vendor/select2/select2.min.js');
    this.loadScript('../../assets/dash/js/main.js');
    this.alignWindow();
      this.getReports();


    setTimeout(()=> {
      console.log(this.allReport);
    },2000);
  }


  logout(){
    this.authService.logout();
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
  alignWindow(){
    this.router.events.subscribe((evt) => {
      if(!(evt instanceof NavigationEnd)){
        return ;
      }
      window.scrollTo(0,0);
    });
  }


  getReports(){
    // read all reports
    this.database.collection('accounts' , reff => {
     return reff.where('amount', '>=', 0);
   }).snapshotChanges().subscribe((response: any) =>  {
   this.allReport = response.map(item => {
     return {
       id: item.payload.doc.id,
       ...item.payload.doc.data(),
     } as REPORTS;
   });

   });
}



}
