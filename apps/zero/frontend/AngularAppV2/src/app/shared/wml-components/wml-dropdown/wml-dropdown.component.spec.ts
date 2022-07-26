import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WmlDropdownComponent } from './wml-dropdown.component';

describe('WmlDropdownComponent', () => {
  let component: WmlDropdownComponent;
  let fixture: ComponentFixture<WmlDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WmlDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WmlDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
