import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingRescheduleComponent } from './booking-reschedule.component';

describe('BookingRescheduleComponent', () => {
  let component: BookingRescheduleComponent;
  let fixture: ComponentFixture<BookingRescheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingRescheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingRescheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
