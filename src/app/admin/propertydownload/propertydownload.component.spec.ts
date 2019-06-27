import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertydownloadComponent } from './propertydownload.component';

describe('PropertydownloadComponent', () => {
  let component: PropertydownloadComponent;
  let fixture: ComponentFixture<PropertydownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertydownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertydownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
