import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSaveAddressComponent } from './popup-save-address.component';

describe('PopupSaveAddressComponent', () => {
  let component: PopupSaveAddressComponent;
  let fixture: ComponentFixture<PopupSaveAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupSaveAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupSaveAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
