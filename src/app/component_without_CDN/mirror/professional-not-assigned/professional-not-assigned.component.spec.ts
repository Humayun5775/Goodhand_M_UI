import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalNotAssignedComponent } from './professional-not-assigned.component';

describe('ProfessionalNotAssignedComponent', () => {
  let component: ProfessionalNotAssignedComponent;
  let fixture: ComponentFixture<ProfessionalNotAssignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionalNotAssignedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalNotAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
