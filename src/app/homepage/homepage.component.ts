import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit  {
  user$: any;

  constructor(public authService: AuthService,
    private meta: Meta, private router: Router) {
    this.user$ = authService.angularFireAuth.authState;


  }
  ngOnInit() {
this.meta.addTags([
  {name: 'money-mine', content: 'get 15% returns in a month.'}
]);
  }
  alignWindow() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return ;
      }
      window.scrollTo(0, 0);
    });
  }




}
