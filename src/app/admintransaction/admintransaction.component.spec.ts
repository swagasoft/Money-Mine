import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmintransactionComponent } from './admintransaction.component';

describe('AdmintransactionComponent', () => {
  let component: AdmintransactionComponent;
  let fixture: ComponentFixture<AdmintransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmintransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmintransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
