import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GettingStartedWithMirrorsComponent } from './getting-started-with-mirrors.component';

describe('GettingStartedWithMirrorsComponent', () => {
  let component: GettingStartedWithMirrorsComponent;
  let fixture: ComponentFixture<GettingStartedWithMirrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GettingStartedWithMirrorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GettingStartedWithMirrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
