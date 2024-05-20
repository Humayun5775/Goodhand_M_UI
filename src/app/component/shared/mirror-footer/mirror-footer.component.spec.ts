import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MirrorFooterComponent } from './mirror-footer.component';

describe('MirrorFooterComponent', () => {
  let component: MirrorFooterComponent;
  let fixture: ComponentFixture<MirrorFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MirrorFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MirrorFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
