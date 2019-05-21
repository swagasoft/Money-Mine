import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-select-account',
  templateUrl: './select-account.component.html',
  styleUrls: ['./select-account.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SelectAccountComponent implements OnInit {

  constructor(private modalService: NgbModal) { }


  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
  openVerticallyCentered2(content) {
    this.modalService.open(content, { centered: true });
  }

  ngOnInit() {
  }

}
