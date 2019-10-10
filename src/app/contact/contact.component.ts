import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})


export class ContactComponent implements OnInit {
loading: boolean;
  constructor(private flashMessage: FlashMessagesService, private database: AngularFirestore) { }
  model  = {
    name: '',
    email: '',
    subject: '',
    message: ''
    }

  ngOnInit() {
    this.loading =false;
    this.resetForm();
  }

  contactUs(form: NgForm){
    this.loading = true;
    console.log(form);
    form.value.date = Date.now();
    const contactInfo = form.value;
    this.database.collection('contactUs').add(contactInfo).then(() => {

      this.flashMessage.show(`message Sent!  `,
      { cssClass: 'text-center bg-success text-white font-weight-bold', timeout: 4000 });
      this.loading = false;
      // this.resetForm();
    });
  }
  resetForm() {
    this.model.email = ' ';
    this.model.name = ' ';
    this.model.subject = ' ';
    this.model.message = ' ';
  }

}
