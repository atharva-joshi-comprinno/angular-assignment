import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TrainerService } from '../../core/trainerService';
import { ThemeService } from '../../core/themeService';
import { ThemeToggle } from "../../shared/components/theme-toggle/theme-toggle";

@Component({
  selector: 'app-landing',
  imports: [FormsModule, ThemeToggle],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  trainerName = '';
  private router = inject(Router);
  private trainerService = inject(TrainerService);
  themeService = inject(ThemeService); // Make it public for template access

  onSubmit() {
    if (this.trainerName.trim()) {
      this.trainerService.setTrainerName(this.trainerName);
      this.router.navigate(['/catalogue']);
    }
  }
}
