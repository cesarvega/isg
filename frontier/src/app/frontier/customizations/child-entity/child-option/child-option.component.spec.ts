import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildOptionComponent } from './child-option.component';

describe('ChildOptionComponent', () => {
  let component: ChildOptionComponent;
  let fixture: ComponentFixture<ChildOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
