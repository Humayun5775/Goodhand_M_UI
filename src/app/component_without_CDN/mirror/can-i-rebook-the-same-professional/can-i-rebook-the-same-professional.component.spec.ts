import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanIRebookTheSameProfessionalComponent } from './can-i-rebook-the-same-professional.component';

describe('CanIRebookTheSameProfessionalComponent', () => {
  let component: CanIRebookTheSameProfessionalComponent;
  let fixture: ComponentFixture<CanIRebookTheSameProfessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanIRebookTheSameProfessionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanIRebookTheSameProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
