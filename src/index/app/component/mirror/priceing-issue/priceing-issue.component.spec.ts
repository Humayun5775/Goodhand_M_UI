import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceingIssueComponent } from './priceing-issue.component';

describe('PriceingIssueComponent', () => {
  let component: PriceingIssueComponent;
  let fixture: ComponentFixture<PriceingIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceingIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceingIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
