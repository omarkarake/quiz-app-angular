import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Observable, Subscription } from 'rxjs';

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface Quiz {
  title: string;
  questions: Question[];
}

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.css'],
})
export class StarterComponent implements OnInit, OnDestroy {
  colors: string[] = ['#FFF1E9', '#E0FDEF', '#EBF0FF', '#F6E7FF'];

getBackgroundColor(index: number): string {
  return this.colors[index % this.colors.length];
}


  quizzes: Quiz[] = [];
  @Output() quizSelected = new EventEmitter<Quiz>();

  constructor(private quizService: QuizService) {}

  private sub: Subscription = new Subscription;

  ngOnInit(): void {
    this.sub = this.quizService.getQuizzes().subscribe((data) => {
      this.quizzes = data.quizzes;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  onSelectQuiz(quiz: Quiz): void {
    this.quizSelected.emit(quiz);
  }

  getIconForQuiz(title: string): string {
    switch (title) {
      case 'JavaScript':
        return 'icon-js';
      case 'HTML':
        return 'icon-html';
      case 'CSS':
        return 'icon-css';
      case 'Accessibility':
        return 'icon-accessibility';
      default:
        return 'icon-default';
    }
  }
}
