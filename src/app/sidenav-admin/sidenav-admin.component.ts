import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav-admin',
  templateUrl: './sidenav-admin.component.html',
  styleUrls: ['./sidenav-admin.component.scss']
})
export class SidenavAdminComponent implements OnInit {

  constructor() { }

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

}
