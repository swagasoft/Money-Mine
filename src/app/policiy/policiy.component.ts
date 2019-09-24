import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-policiy',
  templateUrl: './policiy.component.html',
  styleUrls: ['./policiy.component.scss']
})
export class PoliciyComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.alignWindow();
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
