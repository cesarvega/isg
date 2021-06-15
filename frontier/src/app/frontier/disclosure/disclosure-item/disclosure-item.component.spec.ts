import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisclosureItemComponent } from './disclosure-item.component';

describe('DisclosureItemComponent', () => {
  let component: DisclosureItemComponent;
  let fixture: ComponentFixture<DisclosureItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisclosureItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisclosureItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
