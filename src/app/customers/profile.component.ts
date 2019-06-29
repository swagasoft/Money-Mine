import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class UserProfileComponent implements OnInit {
$userProfile:any;
  constructor(public userService: UsersService) {
    this.$userProfile = userService.profile;
   }

  ngOnInit() {
  }

}
