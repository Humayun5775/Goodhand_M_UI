import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncorrectRefundComponent } from './incorrect-refund.component';

describe('IncorrectRefundComponent', () => {
  let component: IncorrectRefundComponent;
  let fixture: ComponentFixture<IncorrectRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncorrectRefundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncorrectRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
