import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  openNav() {
    if(document.getElementById('mySidenav').style.width == '250px'){
    document.getElementById('mySidenav').style.width = '0';
    } else {
    document.getElementById('mySidenav').style.width = '250px';
    }

}

 closeNav() {
  document.getElementById('mySidenav').style.width = '0';

}
logout(){
  this.auth.logout();
}

}
