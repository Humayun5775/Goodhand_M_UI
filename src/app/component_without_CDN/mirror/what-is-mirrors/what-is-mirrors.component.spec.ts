import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatIsMirrorsComponent } from './what-is-mirrors.component';

describe('WhatIsMirrorsComponent', () => {
  let component: WhatIsMirrorsComponent;
  let fixture: ComponentFixture<WhatIsMirrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatIsMirrorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatIsMirrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
