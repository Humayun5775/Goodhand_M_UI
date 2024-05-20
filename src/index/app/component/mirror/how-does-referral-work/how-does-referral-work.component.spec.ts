import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowDoesReferralWorkComponent } from './how-does-referral-work.component';

describe('HowDoesReferralWorkComponent', () => {
  let component: HowDoesReferralWorkComponent;
  let fixture: ComponentFixture<HowDoesReferralWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowDoesReferralWorkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowDoesReferralWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
