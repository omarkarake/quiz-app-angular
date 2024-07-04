import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'quiz-app';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
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
      'pattern-background-tablet-light'
    ];

    icons.forEach(icon => {
      this.matIconRegistry.addSvgIcon(
        icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/images/${icon}.svg`)
      );
    });
  }
}
