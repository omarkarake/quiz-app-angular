import { Component, Input, OnInit } from '@angular/core';

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
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  @Input() quiz: Quiz | null = null;
  currentQuestionIndex = 0;
  rangeValue: number = 30;
  isHovered: boolean = false;
  hoveredOption: number | null = null;
  selectedOption: number | null = null;

  ngOnInit() {
    if (this.quiz && this.quiz.questions.length > 0) {
      this.currentQuestionIndex = 0;
    }
  }

  updateRangeBar(): void {
    this.rangeValue = Math.min(Math.max(this.rangeValue, 0), 100); // Ensure value is within 0-100
  }

  getCurrentQuestion(): Question | null {
    if (this.quiz && this.quiz.questions.length > 0) {
      return this.quiz.questions[this.currentQuestionIndex];
    }
    return null;
  }

  getOptionLabel(index: number): string {
    return String.fromCharCode(65 + index); // Convert index to A, B, C, etc.
  }

  selectOption(index: number): void {
    this.selectedOption = index;
  }
}
