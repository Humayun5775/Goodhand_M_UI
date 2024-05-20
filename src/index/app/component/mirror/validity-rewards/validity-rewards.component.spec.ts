import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidityRewardsComponent } from './validity-rewards.component';

describe('ValidityRewardsComponent', () => {
  let component: ValidityRewardsComponent;
  let fixture: ComponentFixture<ValidityRewardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidityRewardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidityRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
