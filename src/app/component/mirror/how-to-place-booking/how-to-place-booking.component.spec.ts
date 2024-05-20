import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToPlaceBookingComponent } from './how-to-place-booking.component';

describe('HowToPlaceBookingComponent', () => {
  let component: HowToPlaceBookingComponent;
  let fixture: ComponentFixture<HowToPlaceBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowToPlaceBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowToPlaceBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
