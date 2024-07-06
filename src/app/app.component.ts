import { Component, OnInit, HostListener } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DarkModeService } from './dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'quiz-app';
  isDarkMode = false;
  screenSize: 'lg' | 'md' | 'sm' = 'sm'; // Initialize with a default value
  quizSelected = false;
  quizCompleted = false;
  selectedQuiz: any;
  selectedIcon: string | null = null;
  selectedSubject: string | null = null;
  score = 0;
  totalQuestions = 0;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private darkModeService: DarkModeService
  ) {
    const icons = [
      'icon-accessibility',
      'icon-correct',
      'icon-css',
      'icon-error',
      'icon-html',
      'icon-incorrect',
      'icon-js',
      'icon-moon-dark',
      'icon-moon-light',
      'icon-sun-dark',
      'icon-sun-light',
      'pattern-background-desktop-dark',
      'pattern-background-desktop-light',
      'pattern-background-mobile-dark',
      'pattern-background-mobile-light',
      'pattern-background-tablet-dark',
      'pattern-background-tablet-light',
    ];

    icons.forEach((icon) => {
      this.matIconRegistry.addSvgIcon(
        icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          `assets/images/${icon}.svg`
        )
      );
    });
  }

  ngOnInit() {
    // Subscribe to dark mode changes
    this.darkModeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });

    // Determine initial screen size
    this.updateScreenSize();

    // Listen to window resize events
    window.addEventListener('resize', this.updateScreenSize.bind(this));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateScreenSize();
  }

  updateScreenSize() {
    const width = window.innerWidth;
    if (width >= 1024) {
      this.screenSize = 'lg';
    } else if (width >= 768 && width < 1024) {
      this.screenSize = 'md';
    } else {
      this.screenSize = 'sm';
    }
  }

  extractIconName(iconPath: string): string {
    const parts = iconPath.split('/');
    const iconFileName = parts[parts.length - 1];
    const iconName = iconFileName.split('.')[0]; // Remove the file extension
    return iconName;
  }

  onQuizSelected(quiz: any) {
    this.quizSelected = true;
    this.selectedQuiz = quiz;
    this.totalQuestions = quiz.questions.length;
    this.selectedIcon = this.extractIconName(this.selectedQuiz.icon);
    this.selectedSubject = this.selectedQuiz.title;
  }

  onQuizCompleted(score: number) {
    this.quizCompleted = true;
    this.score = score;
  }

  resetQuiz() {
    this.quizSelected = false;
    this.quizCompleted = false;
    this.selectedQuiz = null;
    this.selectedIcon = null;
    this.selectedSubject = null;
    this.score = 0;
    this.totalQuestions = 0;
  }
}
