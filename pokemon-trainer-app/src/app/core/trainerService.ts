import { Injectable, signal } from '@angular/core';

export interface Pokemon {
  id: number;
  name: string;
  sprites: { front_default: string };
}

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  private trainerName = signal<string>('');
  private caughtPokemon = signal<Pokemon[]>([]);

  constructor() {
    if (typeof window !== 'undefined') {
      this.trainerName.set(sessionStorage.getItem('trainerName') || '');
      this.caughtPokemon.set(JSON.parse(sessionStorage.getItem('caughtPokemon') || '[]'));
    }
  }

  setTrainerName(name: string) {
    this.trainerName.set(name);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('trainerName', name);
    }
  }

  getTrainerName() {
    return this.trainerName();
  }

  catchPokemon(pokemon: Pokemon) {
    this.caughtPokemon.update(list => [...list, pokemon]);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('caughtPokemon', JSON.stringify(this.caughtPokemon()));
    }
  }

  removePokemon(pokemonId: number) {
    this.caughtPokemon.update(list => list.filter(p => p.id !== pokemonId));
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('caughtPokemon', JSON.stringify(this.caughtPokemon()));
    }
  }

  isCaught(pokemonId: number): boolean {
    return this.caughtPokemon().some(p => p.id === pokemonId);
  }

  getCaughtPokemon() {
    return this.caughtPokemon();
  }

  logout() {
    this.trainerName.set('');
    this.caughtPokemon.set([]);
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
    }
  }
}
