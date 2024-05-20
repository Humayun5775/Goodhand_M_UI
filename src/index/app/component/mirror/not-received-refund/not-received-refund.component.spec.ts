import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotReceivedRefundComponent } from './not-received-refund.component';

describe('NotReceivedRefundComponent', () => {
  let component: NotReceivedRefundComponent;
  let fixture: ComponentFixture<NotReceivedRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotReceivedRefundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotReceivedRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
