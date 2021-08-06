import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizationResultComponent } from './customization-result.component';

describe('CustomizationResultComponent', () => {
  let component: CustomizationResultComponent;
  let fixture: ComponentFixture<CustomizationResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizationResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
