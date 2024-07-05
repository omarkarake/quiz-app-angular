import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';

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
export class StarterComponent implements OnInit {
  quizzes: Quiz[] = [];
  selectedQuiz: Quiz | null = null;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.getQuizzes().subscribe((data) => {
      this.quizzes = data.quizzes;
    });
  }

  onSelectQuiz(quiz: Quiz): void {
    this.selectedQuiz = quiz;
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
