import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

interface NOTIFY {
  email: string;
subject: string;
  name: string;
  message: string;
  date: any;
}

@Component({
  selector: 'app-adminnotification',
  templateUrl: './adminnotification.component.html',
  styleUrls: ['./adminnotification.component.scss']
})
export class AdminnotificationComponent implements OnInit {
allContact: any;
showMessage: boolean;

  constructor(
    private database: AngularFirestore,
    private authService: AuthService) { }

  ngOnInit() {
    this.showMessage = false;
    this.getCashout();
    this.loadScript('../../assets/dash/vendor/bootstrap-4.1/popper.min.js');
    this.loadScript('../../assets/dash/vendor/animsition/animsition.min.js');
    this.loadScript('../../assets/dash/vendor/select2/select2.min.js');
    this.loadScript('../../assets/dash/js/main.js');
  }

  getCashout(){
    // read all cashout
    this.database.collection('contactUs').snapshotChanges().subscribe((response: any) =>  {
   this.allContact = response.map(item => {
     return {
       id: item.payload.doc.id,
       ...item.payload.doc.data(),
     } as NOTIFY;
   });

   });
}
logout(){
  this.authService.logout();
  }

  delete(id){
    console.log(id);
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
