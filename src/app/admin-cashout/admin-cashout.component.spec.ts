import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCashoutComponent } from './admin-cashout.component';

describe('AdminCashoutComponent', () => {
  let component: AdminCashoutComponent;
  let fixture: ComponentFixture<AdminCashoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCashoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCashoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
