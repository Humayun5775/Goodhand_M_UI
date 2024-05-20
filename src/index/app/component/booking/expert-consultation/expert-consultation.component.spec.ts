import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertConsultationComponent } from './expert-consultation.component';

describe('ExpertConsultationComponent', () => {
  let component: ExpertConsultationComponent;
  let fixture: ComponentFixture<ExpertConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertConsultationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
