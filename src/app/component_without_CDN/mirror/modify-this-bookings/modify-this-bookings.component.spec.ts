import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyThisBookingsComponent } from './modify-this-bookings.component';

describe('ModifyThisBookingsComponent', () => {
  let component: ModifyThisBookingsComponent;
  let fixture: ComponentFixture<ModifyThisBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyThisBookingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyThisBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
