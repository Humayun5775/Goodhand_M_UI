import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeePaymentDetailsComponent } from './see-payment-details.component';

describe('SeePaymentDetailsComponent', () => {
  let component: SeePaymentDetailsComponent;
  let fixture: ComponentFixture<SeePaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeePaymentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeePaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
