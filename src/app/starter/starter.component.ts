import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface Quiz {
  title: string;
  icon: string;
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
}
