import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildEntityConfigurationComponent } from './child-entity-configuration.component';

describe('ChildEntityConfigurationComponent', () => {
  let component: ChildEntityConfigurationComponent;
  let fixture: ComponentFixture<ChildEntityConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildEntityConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildEntityConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
