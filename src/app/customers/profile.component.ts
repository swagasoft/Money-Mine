import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class UserProfileComponent implements OnInit {
$userProfile:any;
getUser: string;
getProfile: any;

  constructor(
    public userService: UsersService,
    private router : Router,
     private database: AngularFirestore,
     private authService: AuthService) {
    this.getUser = localStorage.getItem('currentUserEmail');

    this.getProfile = database.collection('users', ref => {
      return ref.where('email', '==', this.getUser); }).valueChanges();

   }


  ngOnInit() {
   // load script
   this.loadScript('../../assets/dash/vendor/bootstrap-4.1/popper.min.js');
   this.loadScript('../../assets/dash/vendor/animsition/animsition.min.js');
   this.loadScript('../../assets/dash/vendor/select2/select2.min.js');
   this.loadScript('../../assets/dash/js/main.js');

   this.router.events.subscribe((evt) => {
    if(!(evt instanceof NavigationEnd)){
      return ;
    }
    window.scrollTo(0, 0);
  });

    this.getProfile.subscribe( response => {
      this.$userProfile = response;
      console.log(response);
    });
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

}
