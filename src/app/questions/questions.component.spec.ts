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
      declarations: [QuestionsComponent],
    }).compileComponents();

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
        { question: 'Question 2', options: ['A', 'B', 'C', 'D'], answer: 'B' },
      ],
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
      questions: [],
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

  it('should calculate rangeValue correctly', () => {
    const mockQuiz: Quiz = {
      title: 'Sample Quiz',
      questions: [
        { question: 'Question 1', options: ['A', 'B', 'C', 'D'], answer: 'A' },
        { question: 'Question 2', options: ['A', 'B', 'C', 'D'], answer: 'B' },
        { question: 'Question 3', options: ['A', 'B', 'C', 'D'], answer: 'C' },
      ],
    };

    component.quiz = mockQuiz;

    component.currentQuestionIndex = 0;
    expect(component.rangeValue).toBe((0 / 3) * 100 + 10);

    component.currentQuestionIndex = 1;
    expect(component.rangeValue).toBe((1 / 3) * 100 + 10);

    component.currentQuestionIndex = 2;
    expect(component.rangeValue).toBe((2 / 3) * 100 + 10);

    component.currentQuestionIndex = 3; // out of bounds, but checking for correctness
    expect(component.rangeValue).toBe((3 / 3) * 100 + 10);
  });

  it('should return the current question', () => {
    const mockQuiz: Quiz = {
      title: 'Sample Quiz',
      questions: [
        { question: 'Question 1', options: ['A', 'B', 'C', 'D'], answer: 'A' },
        { question: 'Question 2', options: ['A', 'B', 'C', 'D'], answer: 'B' },
      ],
    };

    component.quiz = mockQuiz;

    component.currentQuestionIndex = 0;
    expect(component.getCurrentQuestion()).toEqual(mockQuiz.questions[0]);

    component.currentQuestionIndex = 1;
    expect(component.getCurrentQuestion()).toEqual(mockQuiz.questions[1]);

    component.currentQuestionIndex = 2;
    expect(component.getCurrentQuestion()).toBeNull();
  });

  it('should return the correct option label', () => {
    expect(component.getOptionLabel(0)).toBe('A');
    expect(component.getOptionLabel(1)).toBe('B');
    expect(component.getOptionLabel(2)).toBe('C');
    expect(component.getOptionLabel(3)).toBe('D');
    expect(component.getOptionLabel(25)).toBe('Z');
    expect(component.getOptionLabel(26)).toBe('['); // Beyond 'Z'
  });

  it('should select an option and reset showError when an option is selected', () => {
    component.showFeedback = false;
    component.selectOption(1);
    expect(component.selectedOption).toBe(1);
    expect(component.showError).toBeFalsy();
  });

  it('should not select an option when showFeedback is true', () => {
    component.showFeedback = true;
    component.selectOption(1);
    expect(component.selectedOption).toBeNull();
  });

  it('should show an error if submitAnswer is called without selecting an option', () => {
    component.submitAnswer();
    expect(component.showError).toBeTruthy();
  });

  it('should evaluate the selected answer correctly and show feedback', () => {
    const mockQuiz: Quiz = {
      title: 'Sample Quiz',
      questions: [
        { question: 'Question 1', options: ['A', 'B', 'C', 'D'], answer: 'A' },
      ],
    };

    component.quiz = mockQuiz;
    component.currentQuestionIndex = 0;
    component.selectOption(0); // Select the correct option

    component.submitAnswer();
    expect(component.isAnswerCorrect).toBeTruthy();
    expect(component.showFeedback).toBeTruthy();
    expect(component.score).toBe(1);

    component.selectOption(1); // Select an incorrect option
    component.submitAnswer();
    expect(component.showFeedback).toBeTruthy();
  });
});
