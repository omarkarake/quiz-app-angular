import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
})
export class ScoreComponent {
  @Input() score: number = 0;
  @Input() totalQuestions: number = 0;
  @Output() playAgain = new EventEmitter<void>();

  onPlayAgain() {
    this.playAgain.emit();
  }
}
