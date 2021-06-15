import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildEntityComponent } from './child-entity.component';

describe('ChildEntityComponent', () => {
  let component: ChildEntityComponent;
  let fixture: ComponentFixture<ChildEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildEntityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
