import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotReceivedRewardReferralComponent } from './not-received-reward-referral.component';

describe('NotReceivedRewardReferralComponent', () => {
  let component: NotReceivedRewardReferralComponent;
  let fixture: ComponentFixture<NotReceivedRewardReferralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotReceivedRewardReferralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotReceivedRewardReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
