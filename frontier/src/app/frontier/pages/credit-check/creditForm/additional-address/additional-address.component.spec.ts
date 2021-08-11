import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalAddressComponent } from './additional-address.component';

describe('AdditionalAddressComponent', () => {
  let component: AdditionalAddressComponent;
  let fixture: ComponentFixture<AdditionalAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdditionalAddressComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
