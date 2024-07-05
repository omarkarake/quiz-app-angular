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
  hoveredOption: number | null = null;
  selectedOption: number | null = null;
  showError: boolean = false;
  showFeedback: boolean = false;
  isAnswerCorrect: boolean = false;

  ngOnInit() {
    if (this.quiz?.questions?.length) {
      this.currentQuestionIndex = 0;
    }
  }

  get rangeValue(): number {
    const totalQuestions = this.quiz?.questions?.length ?? 1;
    return ((this.currentQuestionIndex / totalQuestions) * 100) + 10;
  }

  getCurrentQuestion(): Question | null {
    return this.quiz?.questions?.[this.currentQuestionIndex] ?? null;
  }

  getOptionLabel(index: number): string {
    return String.fromCharCode(65 + index); // Convert index to A, B, C, etc.
  }

  selectOption(index: number): void {
    if (!this.showFeedback) {
      this.selectedOption = index;
      this.showError = false; // Hide error when an option is selected
    }
  }

  submitAnswer(): void {
    if (this.selectedOption === null) {
      this.showError = true;
    } else {
      const currentQuestion = this.getCurrentQuestion();
      if (currentQuestion) {
        this.isAnswerCorrect =
          currentQuestion.options[this.selectedOption] ===
          currentQuestion.answer;
        this.showFeedback = true;
      }
    }
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < (this.quiz?.questions?.length ?? 0) - 1) {
      this.currentQuestionIndex++;
      this.selectedOption = null;
      this.showError = false;
      this.showFeedback = false;
    } else {
      console.log('End of quiz, handle final submission');
      // Handle end of quiz logic here
    }
  }

  isCorrectOption(index: number): boolean {
    const currentQuestion = this.getCurrentQuestion();
    return currentQuestion
      ? currentQuestion.options[index] === currentQuestion.answer
      : false;
  }
}
