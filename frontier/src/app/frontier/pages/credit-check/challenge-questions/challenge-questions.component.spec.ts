import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeQuestionsComponent } from './challenge-questions.component';

describe('ChallengeQuestionsComponent', () => {
  let component: ChallengeQuestionsComponent;
  let fixture: ComponentFixture<ChallengeQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengeQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
