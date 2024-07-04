import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Corrected to styleUrls
})
export class AppComponent {
  title = 'quiz-app';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'accessibility',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/icon-accessibility.svg' // Updated path
      )
    );
  }
}
