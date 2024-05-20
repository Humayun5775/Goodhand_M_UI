import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DidntGetTheCashbackComponent } from './didnt-get-the-cashback.component';

describe('DidntGetTheCashbackComponent', () => {
  let component: DidntGetTheCashbackComponent;
  let fixture: ComponentFixture<DidntGetTheCashbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DidntGetTheCashbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DidntGetTheCashbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
