import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MirrorsMembershipComponent } from './mirrors-membership.component';

describe('MirrorsMembershipComponent', () => {
  let component: MirrorsMembershipComponent;
  let fixture: ComponentFixture<MirrorsMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MirrorsMembershipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MirrorsMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
