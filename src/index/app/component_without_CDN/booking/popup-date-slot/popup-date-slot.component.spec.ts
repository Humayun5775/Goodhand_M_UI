import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDateSlotComponent } from './popup-date-slot.component';

describe('PopupDateSlotComponent', () => {
  let component: PopupDateSlotComponent;
  let fixture: ComponentFixture<PopupDateSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupDateSlotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupDateSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
