import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import smsApi from '../string/sendSms.json';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

sendMessage: any;
bulkSmsUsername: string;
bulkSmsApiKey:any;
bulkSmsSenderName: string;
  constructor(private http: HttpClient) {
    this.bulkSmsUsername = "ayaweisoft@gmail.com";
    this.bulkSmsApiKey = "320bf56fb1683682fef15e4285d52b7861c293ba";
    this.bulkSmsSenderName = 'MONEY-MINE';
  }



  sendSms(number, messages){
  return  this.http.get(`http://api.ebulksms.com:8080/sendsms? username=${this.bulkSmsUsername}&apikey=${this.bulkSmsApiKey}&sender=${this.bulkSmsSenderName}&messagetext=${messages}&flash=0&recipients=${number}`)
  }





}

