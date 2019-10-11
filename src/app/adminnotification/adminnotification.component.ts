import { map } from 'rxjs/operators';
import { FlashMessagesService } from 'angular2-flash-messages';
import { EmailService } from './../email.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { NgForm } from '@angular/forms';

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
allUsersNumber: any = [];
messageSection: boolean;
smsSection: boolean;


  constructor(
    private database: AngularFirestore,
    private authService: AuthService,
    private _flashMessage: FlashMessagesService,
    private messageService: EmailService) { }


  smsModel = {
    messages: ''
  };


  ngOnInit() {
    this.getAllUers();
    this.messageSection = true;
    this.smsSection = false;
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
getAllUers(){
  this.database.collection('users').snapshotChanges().subscribe((res : any) => {
  res.map(item => {
       this.allUsersNumber.push(item.payload.doc.data().number) ;
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

  smsClick(){
    this.smsSection = true;
    this.messageSection = false;
  }
  messageClick(){
    this.smsSection = false;
    this.messageSection = true;
  }

 async sendBulkSms(){
   let AdminSms =  this.smsModel.messages;
   const dailCode = '+234';

   await this.allUsersNumber.forEach( number => {
      console.log(dailCode+number);
      this.messageService.sendSms(dailCode+number, AdminSms).subscribe(
        val => {
          console.log(val);
        },
        response => {
          if (response.status === 200){
                    this._flashMessage.show(`Message sent!`,
              { cssClass: 'text-center bg-success text-white ', timeout: 2000 });

                  } else {
                    this._flashMessage.show(`${response.statusText}`,
                    { cssClass: 'text-center bg-white text-white ', timeout: 4000 });
                  }
        }
      );
   });

   this.smsModel.messages = '';
  }
}
