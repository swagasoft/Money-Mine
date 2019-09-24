import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit  {
  user$: any;

  constructor(public authService: AuthService, private router: Router) {
    this.user$ = authService.angularFireAuth.authState;


  }
  ngOnInit() {
console.log(this.authService.isUserLoggedIn());
  }
  alignWindow(){
    this.router.events.subscribe((evt) => {
      if(!(evt instanceof NavigationEnd)){
        return ;
      }
      window.scrollTo(0,0);
    });
  }




}
