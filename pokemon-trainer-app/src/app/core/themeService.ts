import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkMode = signal(false);

  constructor() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const saved = localStorage.getItem('theme');
      console.log('Saved theme from localStorage:', saved);
      
      if (saved === 'dark') {
        this.isDarkMode.set(true);
      } else if (saved === 'light') {
        this.isDarkMode.set(false);
      } else {
        this.isDarkMode.set(false);
      }
      
      console.log('Initial isDarkMode signal:', this.isDarkMode());
      this.applyTheme();
    }
  }

  toggleTheme() {
    console.log('Before toggle:', this.isDarkMode());
    this.isDarkMode.update(dark => !dark);
    console.log('After toggle:', this.isDarkMode());
    
    this.applyTheme();
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
      console.log('Saved to localStorage:', this.isDarkMode() ? 'dark' : 'light');
    }
  }

  private applyTheme() {
    if (typeof document !== 'undefined') {
      console.log('Applying theme, isDark:', this.isDarkMode());
      console.log('Document element exists:', !!document.documentElement);
      
      if (this.isDarkMode()) {
        document.documentElement.classList.add('dark');
        console.log('Added dark class');
      } else {
        document.documentElement.classList.remove('dark');
        console.log('Removed dark class');
      }
      
      console.log('Current classes:', document.documentElement.className);
      console.log('Contains dark:', document.documentElement.classList.contains('dark'));
    }
  }
}
