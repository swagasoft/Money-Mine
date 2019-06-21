import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [
    './navbar.component.scss'
]
})
export class NavbarComponent {
  public isCollapsed = true;
  userDetails: any;
  responseMessage = '';
  responseMessageType = '';
  user$: any;

  constructor(public authService: AuthService, private router: Router,private afAuth: AngularFireAuth) {

    this.user$ = authService.angularFireAuth.authState;
   }


    // SignOut Firebase Session and Clean LocalStorage
    logoutUser() {
      this.authService.logout()
        .then(res => {
          console.log(res);
          this.userDetails = undefined;
          localStorage.removeItem('user');
          console.log('you just log out');
          this.showMessage('logout', 'logout successful');
          this.router.navigate(['/login']);
        }, err => {
          this.showMessage('danger', err.message);
        });
        localStorage.clear();
    }


     // Comman Method to Show Message and Hide after 2 seconds
 showMessage(type, msg) {
  this.responseMessageType = type;
  this.responseMessage = msg;
  setTimeout(() => {
    this.responseMessage = '';
  }, 2000);
}

navControl(){
 let control = document.querySelector('.navbar-toggler') as HTMLInputElement;
 control.click();
}


}
