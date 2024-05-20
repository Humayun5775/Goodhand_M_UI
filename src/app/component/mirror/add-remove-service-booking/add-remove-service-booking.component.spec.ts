import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRemoveServiceBookingComponent } from './add-remove-service-booking.component';

describe('AddRemoveServiceBookingComponent', () => {
  let component: AddRemoveServiceBookingComponent;
  let fixture: ComponentFixture<AddRemoveServiceBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRemoveServiceBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRemoveServiceBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
