import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferredSlotsNotAvailbleComponent } from './preferred-slots-not-availble.component';

describe('PreferredSlotsNotAvailbleComponent', () => {
  let component: PreferredSlotsNotAvailbleComponent;
  let fixture: ComponentFixture<PreferredSlotsNotAvailbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferredSlotsNotAvailbleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferredSlotsNotAvailbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
