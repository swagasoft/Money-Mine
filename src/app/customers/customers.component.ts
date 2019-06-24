import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class UserProfileComponent implements OnInit {

  customers = ['simon', 'victor', 'james', 'peter', 'sports'];

  constructor() { }

  ngOnInit() {
  }

}
