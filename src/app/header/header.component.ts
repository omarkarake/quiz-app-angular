import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isDarkMode = false;

  ngOnInit(): void {
    // Check initial system preference
    this.checkSystemDarkMode();

    // Add event listener for system dark mode changes
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', this.checkSystemDarkMode.bind(this));
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyDarkMode(this.isDarkMode);
  }

  private checkSystemDarkMode(event?: MediaQueryListEvent): void {
    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    this.isDarkMode = event ? event.matches : prefersDarkMode;
    this.applyDarkMode(this.isDarkMode);
  }

  private applyDarkMode(isDarkMode: boolean): void {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
