import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePaymentBookingComponent } from './make-payment-booking.component';

describe('MakePaymentBookingComponent', () => {
  let component: MakePaymentBookingComponent;
  let fixture: ComponentFixture<MakePaymentBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakePaymentBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakePaymentBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
