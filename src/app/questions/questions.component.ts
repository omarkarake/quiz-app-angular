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
  showError: boolean = false;

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
    this.showError = false; // Hide error when an option is selected
  }

  submitAnswer(): void {
    if (this.selectedOption === null) {
      this.showError = true;
    } else {
      // Handle answer submission logic here, e.g., check if the answer is correct
      if (this.currentQuestionIndex < this.quiz!.questions.length - 1) {
        this.nextQuestion();
      } else {
        console.log('End of quiz, handle final submission');
        // Handle end of quiz logic here
      }
    }
  }

  nextQuestion(): void {
    if (this.selectedOption === null) {
      this.showError = true;
    } else {
      this.currentQuestionIndex++;
      this.selectedOption = null;
      this.showError = false;
    }
  }
}
