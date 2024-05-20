import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAnotherIssueComponent } from './report-another-issue.component';

describe('ReportAnotherIssueComponent', () => {
  let component: ReportAnotherIssueComponent;
  let fixture: ComponentFixture<ReportAnotherIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportAnotherIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportAnotherIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
