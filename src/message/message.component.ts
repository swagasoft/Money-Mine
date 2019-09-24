import { AuthService } from './../app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(private authService: AuthService) { }

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
