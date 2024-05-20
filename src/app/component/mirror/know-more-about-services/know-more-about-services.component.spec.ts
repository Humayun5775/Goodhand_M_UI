import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowMoreAboutServicesComponent } from './know-more-about-services.component';

describe('KnowMoreAboutServicesComponent', () => {
  let component: KnowMoreAboutServicesComponent;
  let fixture: ComponentFixture<KnowMoreAboutServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnowMoreAboutServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KnowMoreAboutServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
