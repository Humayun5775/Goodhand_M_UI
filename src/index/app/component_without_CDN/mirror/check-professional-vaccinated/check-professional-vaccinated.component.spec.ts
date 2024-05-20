import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckProfessionalVaccinatedComponent } from './check-professional-vaccinated.component';

describe('CheckProfessionalVaccinatedComponent', () => {
  let component: CheckProfessionalVaccinatedComponent;
  let fixture: ComponentFixture<CheckProfessionalVaccinatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckProfessionalVaccinatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckProfessionalVaccinatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
