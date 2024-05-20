import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherPaymentRelatedIssueComponent } from './other-payment-related-issue.component';

describe('OtherPaymentRelatedIssueComponent', () => {
  let component: OtherPaymentRelatedIssueComponent;
  let fixture: ComponentFixture<OtherPaymentRelatedIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherPaymentRelatedIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherPaymentRelatedIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
