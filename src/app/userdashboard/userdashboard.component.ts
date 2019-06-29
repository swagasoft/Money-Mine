import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.scss']
})
export class UserdashboardComponent implements OnInit {
myAccountDetails: any;
$userProfile:any;
  constructor(public userService: UsersService) {
    this.myAccountDetails = userService.getUserAccount;
    this.$userProfile = userService.profile;



   }

  ngOnInit() {

  }

}
