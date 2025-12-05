import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing',
  imports: [FormsModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  trainerName = '';

  onSubmit() {
    console.log('Trainer name:', this.trainerName);
  }
}
