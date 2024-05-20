import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddCardComponent } from './popup-add-card.component';

describe('PopupAddCardComponent', () => {
  let component: PopupAddCardComponent;
  let fixture: ComponentFixture<PopupAddCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupAddCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupAddCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
