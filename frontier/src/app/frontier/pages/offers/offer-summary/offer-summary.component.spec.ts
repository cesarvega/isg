import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferSummaryComponent } from './offer-summary.component';

describe('OfferSummaryComponent', () => {
  let component: OfferSummaryComponent;
  let fixture: ComponentFixture<OfferSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
