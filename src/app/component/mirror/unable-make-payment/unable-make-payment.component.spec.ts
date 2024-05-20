import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnableMakePaymentComponent } from './unable-make-payment.component';

describe('UnableMakePaymentComponent', () => {
  let component: UnableMakePaymentComponent;
  let fixture: ComponentFixture<UnableMakePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnableMakePaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnableMakePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
