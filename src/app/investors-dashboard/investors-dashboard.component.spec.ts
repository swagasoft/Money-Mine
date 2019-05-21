import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorsDashboardComponent } from './investors-dashboard.component';

describe('InvestorsDashboardComponent', () => {
  let component: InvestorsDashboardComponent;
  let fixture: ComponentFixture<InvestorsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
