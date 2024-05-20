import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckWalletBalanceComponent } from './check-wallet-balance.component';

describe('CheckWalletBalanceComponent', () => {
  let component: CheckWalletBalanceComponent;
  let fixture: ComponentFixture<CheckWalletBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckWalletBalanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckWalletBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
