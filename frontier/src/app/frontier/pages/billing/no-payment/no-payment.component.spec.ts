import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoPaymentComponent } from './no-payment.component';

describe('NoPaymentComponent', () => {
  let component: NoPaymentComponent;
  let fixture: ComponentFixture<NoPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
