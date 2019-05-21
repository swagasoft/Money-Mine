import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImlMembersComponent } from './iml-members.component';

describe('ImlMembersComponent', () => {
  let component: ImlMembersComponent;
  let fixture: ComponentFixture<ImlMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImlMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImlMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
