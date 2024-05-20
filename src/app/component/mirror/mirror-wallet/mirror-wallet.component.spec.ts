import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MirrorWalletComponent } from './mirror-wallet.component';

describe('MirrorWalletComponent', () => {
  let component: MirrorWalletComponent;
  let fixture: ComponentFixture<MirrorWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MirrorWalletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MirrorWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
