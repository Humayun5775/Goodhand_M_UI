import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTheProfessionalComponent } from './contact-the-professional.component';

describe('ContactTheProfessionalComponent', () => {
  let component: ContactTheProfessionalComponent;
  let fixture: ComponentFixture<ContactTheProfessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactTheProfessionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactTheProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
