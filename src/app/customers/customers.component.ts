import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers = ['simon', 'victor', 'james', 'peter', 'sports'];

  constructor() { }

  ngOnInit() {
  }

}
