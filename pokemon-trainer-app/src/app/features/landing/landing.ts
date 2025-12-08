import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TrainerService } from '../../core/trainerService';

@Component({
  selector: 'app-landing',
  imports: [FormsModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  trainerName = '';
  private router = inject(Router);
  private trainerService = inject(TrainerService);

  onSubmit() {
    if (this.trainerName.trim()) {
      this.trainerService.setTrainerName(this.trainerName);
      this.router.navigate(['/catalogue']);
    }
  }
}
