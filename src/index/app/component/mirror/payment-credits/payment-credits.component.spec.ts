import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCreditsComponent } from './payment-credits.component';

describe('PaymentCreditsComponent', () => {
  let component: PaymentCreditsComponent;
  let fixture: ComponentFixture<PaymentCreditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentCreditsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
