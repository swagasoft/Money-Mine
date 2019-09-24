import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav-admin',
  templateUrl: './sidenav-admin.component.html',
  styleUrls: ['./sidenav-admin.component.scss']
})
export class SidenavAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.loadScript('../../assets/dash/vendor/bootstrap-4.1/popper.min.js');
    this.loadScript('../../assets/dash/vendor/animsition/animsition.min.js');
    this.loadScript('../../assets/dash/vendor/select2/select2.min.js');
    this.loadScript('../../assets/dash/js/main.js');


  }
  openNav() {
    if(document.getElementById('mySidenav').style.width == '250px'){
    document.getElementById('mySidenav').style.width = '0';
    } else {
    document.getElementById('mySidenav').style.width = '250px';
    }
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
