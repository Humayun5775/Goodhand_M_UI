import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidSafetyComponent } from './covid-safety.component';

describe('CovidSafetyComponent', () => {
  let component: CovidSafetyComponent;
  let fixture: ComponentFixture<CovidSafetyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidSafetyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovidSafetyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
