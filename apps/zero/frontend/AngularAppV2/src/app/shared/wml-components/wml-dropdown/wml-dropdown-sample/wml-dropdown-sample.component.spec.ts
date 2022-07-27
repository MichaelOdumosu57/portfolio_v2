import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WmlDropdownSampleComponent } from './wml-dropdown-sample.component';

describe('WmlDropdownSampleComponent', () => {
  let component: WmlDropdownSampleComponent;
  let fixture: ComponentFixture<WmlDropdownSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WmlDropdownSampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WmlDropdownSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
