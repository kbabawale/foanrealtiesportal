import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceRealtorComponent } from './invoice-realtor.component';

describe('InvoiceRealtorComponent', () => {
  let component: InvoiceRealtorComponent;
  let fixture: ComponentFixture<InvoiceRealtorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceRealtorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceRealtorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
