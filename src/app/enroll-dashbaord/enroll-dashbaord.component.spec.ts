import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollDashbaordComponent } from './enroll-dashbaord.component';

describe('EnrollDashbaordComponent', () => {
  let component: EnrollDashbaordComponent;
  let fixture: ComponentFixture<EnrollDashbaordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollDashbaordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollDashbaordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
