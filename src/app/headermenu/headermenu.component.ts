import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './headermenu.component.html',
  styleUrls: ['./headermenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {

      // load script
      this.loadScript('../../assets/dash/vendor/jquery-3.2.1.min.js');
      this.loadScript('../../assets/dash/vendor/bootstrap-4.1/popper.min.js');
      this.loadScript('../../assets/dash/vendor/bootstrap-4.1/bootstrap.min.js');
      // this.loadScript('../../src/assets/dash/vendor/slick/slick.min.js');
      // this.loadScript('../../src/assets/dash/vendor/wow/wow.min.js');
      this.loadScript('../../assets/dash/vendor/animsition/animsition.min.js');
      this.loadScript('../../assets/dash/vendor/bootstrap-progressbar/bootstrap-progressbar.min.js');
      this.loadScript('../../assets/dash/vendor/counter-up/jquery.waypoints.min.js');
      this.loadScript('../../assets/dash/vendor/counter-up/jquery.counterup.min.js');
      this.loadScript('../../assets/dash/vendor/circle-progress/circle-progress.min.js');
      this.loadScript('../../assets/dash/vendor/perfect-scrollbar/perfect-scrollbar.js');
      this.loadScript('../../assets/dash/vendor/chartjs/Chart.bundle.min.js');
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

}
