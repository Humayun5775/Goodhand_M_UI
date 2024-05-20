import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSalonRetailComponent } from './home-salon-retail.component';

describe('HomeSalonRetailComponent', () => {
  let component: HomeSalonRetailComponent;
  let fixture: ComponentFixture<HomeSalonRetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSalonRetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSalonRetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
