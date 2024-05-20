import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MirrorsSafetyComponent } from './mirrors-safety.component';

describe('MirrorsSafetyComponent', () => {
  let component: MirrorsSafetyComponent;
  let fixture: ComponentFixture<MirrorsSafetyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MirrorsSafetyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MirrorsSafetyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
