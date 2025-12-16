import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerService } from '../../core/trainerService';
import { ThemeService } from '../../core/themeService';
import { Router } from '@angular/router';
import { CapitalizePipe } from '../../shared/pipes/capitalize-pipe';
import { ThemeToggle } from '../../shared/components/theme-toggle/theme-toggle';

@Component({
  selector: 'app-trainer',
  imports: [CommonModule, CapitalizePipe, ThemeToggle],
  templateUrl: './trainer.html',
  styleUrl: './trainer.css',
})
export class Trainer implements OnInit {
  private trainerService = inject(TrainerService);
  private router = inject(Router);
  themeService = inject(ThemeService); // Make it public for template access
  
  trainerName = signal('');
  caughtPokemon = signal<any[]>([]);

  ngOnInit() {
    this.trainerName.set(this.trainerService.getTrainerName());
    this.caughtPokemon.set(this.trainerService.getCaughtPokemon());
  }

  removePokemon(pokemonId: number) {
    this.trainerService.removePokemon(pokemonId);
    this.caughtPokemon.set(this.trainerService.getCaughtPokemon());
  }

  logout() {
    this.trainerService.logout();
    this.router.navigate(['/']);
  }

  goToCatalogue() {
    this.router.navigate(['/catalogue']);
  }
}
