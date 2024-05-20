import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferredProfessionalComponent } from './preferred-professional.component';

describe('PreferredProfessionalComponent', () => {
  let component: PreferredProfessionalComponent;
  let fixture: ComponentFixture<PreferredProfessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferredProfessionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferredProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
