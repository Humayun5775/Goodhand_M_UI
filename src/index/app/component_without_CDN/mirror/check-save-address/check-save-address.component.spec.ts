import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckSaveAddressComponent } from './check-save-address.component';

describe('CheckSaveAddressComponent', () => {
  let component: CheckSaveAddressComponent;
  let fixture: ComponentFixture<CheckSaveAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckSaveAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckSaveAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
