import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimumOrderComponent } from './minimum-order.component';

describe('MinimumOrderComponent', () => {
  let component: MinimumOrderComponent;
  let fixture: ComponentFixture<MinimumOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinimumOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinimumOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
