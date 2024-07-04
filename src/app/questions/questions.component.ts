import { Component } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css',
})
export class QuestionsComponent {
  rangeValue: number = 30;
  isHovered: boolean = false;

  updateRangeBar(): void {
    this.rangeValue = Math.min(Math.max(this.rangeValue, 0), 100); // Ensure value is within 0-100
  }
}
