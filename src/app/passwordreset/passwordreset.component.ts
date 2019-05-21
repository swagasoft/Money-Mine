import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.css']
})
export class PasswordresetComponent implements OnInit {
  emailInput: string;
  isForgotPassword: boolean;
  responseMessage = '';
  responseMessageType = '';

  constructor(private authService: AuthService, private router: Router) { }

    // Send link on given email to reset password
    forgotPassword() {
      this.authService.sendPasswordResetEmail(this.emailInput)
        .then(res => {
          console.log(res);
          this.isForgotPassword = false;
          this.showMessage("success", "Please Check Your Email");
        }, err => {
          this.showMessage("danger", err.message);
        });
    }

     // Comman Method to Show Message and Hide after 2 seconds
 showMessage(type, msg) {
  this.responseMessageType = type;
  this.responseMessage = msg;
  setTimeout(() => {
    this.responseMessage = '';
  }, 8000);
}
  ngOnInit() {
  }

}
