import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCaseSelectorComponent } from './test-case-selector.component';

describe('TestCaseSelectorComponent', () => {
  let component: TestCaseSelectorComponent;
  let fixture: ComponentFixture<TestCaseSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestCaseSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCaseSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
