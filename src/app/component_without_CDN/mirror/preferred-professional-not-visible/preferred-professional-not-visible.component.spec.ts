import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferredProfessionalNotVisibleComponent } from './preferred-professional-not-visible.component';

describe('PreferredProfessionalNotVisibleComponent', () => {
  let component: PreferredProfessionalNotVisibleComponent;
  let fixture: ComponentFixture<PreferredProfessionalNotVisibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferredProfessionalNotVisibleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferredProfessionalNotVisibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
