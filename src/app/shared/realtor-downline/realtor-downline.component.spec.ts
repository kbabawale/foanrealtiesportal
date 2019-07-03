import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtorDownlineComponent } from './realtor-downline.component';

describe('RealtorDownlineComponent', () => {
  let component: RealtorDownlineComponent;
  let fixture: ComponentFixture<RealtorDownlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealtorDownlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtorDownlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
