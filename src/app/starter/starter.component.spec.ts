import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StarterComponent } from './starter.component';
import { QuizService } from '../quiz.service';
import { of } from 'rxjs';

describe('StarterComponent', () => {
  let component: StarterComponent;
  let fixture: ComponentFixture<StarterComponent>;
  let quizService: QuizService;

  const mockQuizData = {
    quizzes: [
      { title: 'JavaScript', icon: 'icon-js', questions: [] },
      { title: 'HTML', icon: 'icon-html', questions: [] }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StarterComponent],
      imports: [HttpClientTestingModule],
      providers: [QuizService]
    }).compileComponents();

    fixture = TestBed.createComponent(StarterComponent);
    component = fixture.componentInstance;
    quizService = TestBed.inject(QuizService);

    jest.spyOn(quizService, 'getQuizzes').mockReturnValue(of(mockQuizData));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load quizzes on init', () => {
    expect(component.quizzes).toEqual(mockQuizData.quizzes);
  });

  it('should emit selected quiz', () => {
    jest.spyOn(component.quizSelected, 'emit');
    const quiz = mockQuizData.quizzes[0];
    component.onSelectQuiz(quiz);
    expect(component.quizSelected.emit).toHaveBeenCalledWith(quiz);
  });

  it('should return correct icon for quiz title', () => {
    expect(component.getIconForQuiz('JavaScript')).toBe('icon-js');
    expect(component.getIconForQuiz('HTML')).toBe('icon-html');
    expect(component.getIconForQuiz('CSS')).toBe('icon-css');
    expect(component.getIconForQuiz('Accessibility')).toBe('icon-accessibility');
    expect(component.getIconForQuiz('Unknown')).toBe('icon-default');
  });

  it('should return correct background color', () => {
    expect(component.getBackgroundColor(0)).toBe('#FFF1E9');
    expect(component.getBackgroundColor(1)).toBe('#E0FDEF');
    expect(component.getBackgroundColor(4)).toBe('#FFF1E9');
  });
});
