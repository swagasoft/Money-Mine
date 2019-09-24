import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCashoutComponent } from './user-cashout.component';

describe('UserCashoutComponent', () => {
  let component: UserCashoutComponent;
  let fixture: ComponentFixture<UserCashoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCashoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCashoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
