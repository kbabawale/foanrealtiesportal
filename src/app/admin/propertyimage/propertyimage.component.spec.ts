import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyimageComponent } from './propertyimage.component';

describe('PropertyimageComponent', () => {
  let component: PropertyimageComponent;
  let fixture: ComponentFixture<PropertyimageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyimageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
