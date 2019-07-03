import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionRealtorComponent } from './inspection-realtor.component';

describe('InspectionRealtorComponent', () => {
  let component: InspectionRealtorComponent;
  let fixture: ComponentFixture<InspectionRealtorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionRealtorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionRealtorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
