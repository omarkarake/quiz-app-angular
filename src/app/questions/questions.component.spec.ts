import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionsComponent } from './questions.component';

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface Quiz {
  title: string;
  questions: Question[];
}

describe('QuestionsComponent', () => {
  let component: QuestionsComponent;
  let fixture: ComponentFixture<QuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize currentQuestionIndex to 0 when quiz has questions', () => {
    // Arrange: Create a mock quiz with questions
    const mockQuiz: Quiz = {
      title: 'Sample Quiz',
      questions: [
        { question: 'Question 1', options: ['A', 'B', 'C', 'D'], answer: 'A' },
        { question: 'Question 2', options: ['A', 'B', 'C', 'D'], answer: 'B' }
      ]
    };

    // Act: Assign the mock quiz to the component and call ngOnInit
    component.quiz = mockQuiz;
    component.ngOnInit();

    // Assert: Check if currentQuestionIndex is set to 0
    expect(component.currentQuestionIndex).toBe(0);
  });

  it('should keep currentQuestionIndex as 0 when quiz has no questions', () => {
    // Arrange: Create a mock quiz with no questions
    const mockQuiz: Quiz = {
      title: 'Sample Quiz',
      questions: []
    };

    // Act: Assign the mock quiz to the component and call ngOnInit
    component.quiz = mockQuiz;
    component.ngOnInit();

    // Assert: Check if currentQuestionIndex is set to 0
    expect(component.currentQuestionIndex).toBe(0);
  });

  it('should keep currentQuestionIndex as 0 when quiz is null', () => {
    // Act: Assign null to the component's quiz and call ngOnInit
    component.quiz = null;
    component.ngOnInit();

    // Assert: Check if currentQuestionIndex is set to 0
    expect(component.currentQuestionIndex).toBe(0);
  });
});
