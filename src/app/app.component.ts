// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
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
      // You can apply dark mode changes to the app here if needed
    });
  }
}
