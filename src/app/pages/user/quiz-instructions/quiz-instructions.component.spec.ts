import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizInstructionsComponent } from './quiz-instructions.component';

describe('QuizInstructionsComponent', () => {
  let component: QuizInstructionsComponent;
  let fixture: ComponentFixture<QuizInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizInstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
