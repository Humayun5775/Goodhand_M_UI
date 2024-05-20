import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateSlotComponent } from './date-slot.component';

describe('DateSlotComponent', () => {
  let component: DateSlotComponent;
  let fixture: ComponentFixture<DateSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateSlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
