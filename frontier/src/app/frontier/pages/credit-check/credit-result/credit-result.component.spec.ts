import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditResultComponent } from './credit-result.component';

describe('CreditResultComponent', () => {
  let component: CreditResultComponent;
  let fixture: ComponentFixture<CreditResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
