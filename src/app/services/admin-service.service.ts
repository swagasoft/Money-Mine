import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  tradeCount: any;

  constructor() {
    var countDownDate = new Date("Jan 5, 2020 15:37:25").getTime();

    var x = setInterval(function() {

      // Get today's date and time
      var now = new Date().getTime();


      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (5000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      let counting = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";



      // If the count down is over, write some text
      if (distance < 0) {
        clearInterval(x);
       this.tradeCount = "No Running Trade";
      }
    }, 1000);
   }




}
