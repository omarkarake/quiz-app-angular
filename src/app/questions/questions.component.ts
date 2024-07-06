import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

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
  @Output() quizCompleted = new EventEmitter<number>();
  currentQuestionIndex = 0;
  hoveredOption: number | null = null;
  selectedOption: number | null = null;
  showError: boolean = false;
  showFeedback: boolean = false;
  isAnswerCorrect: boolean = false;
  score = 0;

  ngOnInit() {
    if (this.quiz?.questions?.length) {
      this.currentQuestionIndex = 0;
    }
    console.log('Quiz initialized:', this.quiz);
  }

  get rangeValue(): number {
    const totalQuestions = this.quiz?.questions?.length ?? 1;
    return (this.currentQuestionIndex / totalQuestions) * 100 + 10;
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
      console.log('Option selected:', index);
    }
  }

  submitAnswer(): void {
    if (this.selectedOption === null) {
      this.showError = true;
      console.log('No option selected, showing error');
    } else {
      const currentQuestion = this.getCurrentQuestion();
      if (currentQuestion) {
        this.isAnswerCorrect =
          currentQuestion.options[this.selectedOption] ===
          currentQuestion.answer;
        this.showFeedback = true;
        if (this.isAnswerCorrect) {
          this.score++;
        }
        console.log('Answer submitted:', {
          selectedOption: this.selectedOption,
          isAnswerCorrect: this.isAnswerCorrect,
          currentScore: this.score,
        });
        // Log the current score
        console.log('Current Score:', this.score);
      }
    }
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < (this.quiz?.questions?.length ?? 0) - 1) {
      this.currentQuestionIndex++;
      this.selectedOption = null;
      this.showError = false;
      this.showFeedback = false;
      console.log('Moving to next question:', this.currentQuestionIndex);
    } else {
      // Last question, submit quiz
      console.log('Quiz completed with score:', this.score);
      this.quizCompleted.emit(this.score);
    }
  }

  isCorrectOption(index: number): boolean {
    const currentQuestion = this.getCurrentQuestion();
    return currentQuestion
      ? currentQuestion.options[index] === currentQuestion.answer
      : false;
  }
}
