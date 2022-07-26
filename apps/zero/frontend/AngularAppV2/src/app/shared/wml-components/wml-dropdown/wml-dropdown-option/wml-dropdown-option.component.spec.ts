import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WmlDropdownOptionComponent } from './wml-dropdown-option.component';

describe('WmlDropdownOptionComponent', () => {
  let component: WmlDropdownOptionComponent;
  let fixture: ComponentFixture<WmlDropdownOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WmlDropdownOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WmlDropdownOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
