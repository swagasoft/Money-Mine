import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
//  import * as fire from 'firebase;'


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  userDetails: any;
  displayEmail: any;
  getUser: any;
  user$: any;


  constructor(
    private authService: AuthService,
    private router: Router,
    private afauth: AngularFireAuth,
    private database: AngularFirestore
     ) {
      this.user$ = authService.angularFireAuth.authState;

    this.getUser =  localStorage.getItem('currentUserEmail');
      //  read user role
    database.collection('users', reff => {
        return reff.where('email','==', this.getUser)
      }).get().toPromise().then( docs => docs.forEach(doc => {
         localStorage.setItem('userRole',doc.data().role)  ;
      }));

  }

  ngOnInit() {
      // load script
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

}
