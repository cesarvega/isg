import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontierMainComponent } from './frontier-main.component';

describe('FrontierMainComponent', () => {
  let component: FrontierMainComponent;
  let fixture: ComponentFixture<FrontierMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontierMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontierMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
