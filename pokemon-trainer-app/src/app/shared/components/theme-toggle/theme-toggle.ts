import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/themeService';

@Component({
  selector: 'app-theme-toggle',
  imports: [],
  standalone: true,
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.css',
})
export class ThemeToggle {
  themeService = inject(ThemeService);
  
  toggleTheme(){
    console.log('Toggle clicked, current theme:', this.themeService.isDarkMode());
    this.themeService.toggleTheme();
    console.log('After toggle, new theme:', this.themeService.isDarkMode());
  }
}
