import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotHappyServiceExperienceComponent } from './not-happy-service-experience.component';

describe('NotHappyServiceExperienceComponent', () => {
  let component: NotHappyServiceExperienceComponent;
  let fixture: ComponentFixture<NotHappyServiceExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotHappyServiceExperienceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotHappyServiceExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
