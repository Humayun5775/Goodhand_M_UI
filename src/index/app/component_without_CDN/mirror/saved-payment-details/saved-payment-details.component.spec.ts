import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedPaymentDetailsComponent } from './saved-payment-details.component';

describe('SavedPaymentDetailsComponent', () => {
  let component: SavedPaymentDetailsComponent;
  let fixture: ComponentFixture<SavedPaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedPaymentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
