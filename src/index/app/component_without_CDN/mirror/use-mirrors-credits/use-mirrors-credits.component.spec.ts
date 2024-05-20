import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseMirrorsCreditsComponent } from './use-mirrors-credits.component';

describe('UseMirrorsCreditsComponent', () => {
  let component: UseMirrorsCreditsComponent;
  let fixture: ComponentFixture<UseMirrorsCreditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseMirrorsCreditsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseMirrorsCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
