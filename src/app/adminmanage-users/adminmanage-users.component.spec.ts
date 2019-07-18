import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmanageUsersComponent } from './adminmanage-users.component';

describe('AdminmanageUsersComponent', () => {
  let component: AdminmanageUsersComponent;
  let fixture: ComponentFixture<AdminmanageUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminmanageUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminmanageUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
