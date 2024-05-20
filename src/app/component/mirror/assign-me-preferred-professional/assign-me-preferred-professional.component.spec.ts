import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignMePreferredProfessionalComponent } from './assign-me-preferred-professional.component';

describe('AssignMePreferredProfessionalComponent', () => {
  let component: AssignMePreferredProfessionalComponent;
  let fixture: ComponentFixture<AssignMePreferredProfessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignMePreferredProfessionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignMePreferredProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
