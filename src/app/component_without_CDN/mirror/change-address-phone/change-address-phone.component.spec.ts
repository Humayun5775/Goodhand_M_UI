import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAddressPhoneComponent } from './change-address-phone.component';

describe('ChangeAddressPhoneComponent', () => {
  let component: ChangeAddressPhoneComponent;
  let fixture: ComponentFixture<ChangeAddressPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeAddressPhoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeAddressPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
