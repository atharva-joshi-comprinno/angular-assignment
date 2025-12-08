import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService, PokemonDetail } from '../../core/pokemonService';
import { TrainerService } from '../../core/trainerService';
import { Router } from '@angular/router';
import { CapitalizePipe } from '../../shared/pipes/capitalize-pipe';
import { PokemonCard } from '../../shared/components/pokemon-card/pokemon-card';

@Component({
  selector: 'app-catalogue',
  imports: [CommonModule, CapitalizePipe, PokemonCard],
  templateUrl: './catalogue.html',
  styleUrl: './catalogue.css',
})
export class Catalogue implements OnInit {
  private pokemonService = inject(PokemonService);
  private trainerService = inject(TrainerService);
  private router = inject(Router);
  
  pokemonList = signal<PokemonDetail[]>([]);
  loading = signal(true);
  selectedType = signal<string>('all');
  allTypes = signal<string[]>(['all']);

  filteredPokemon = computed(() => {
    if (this.selectedType() === 'all') return this.pokemonList();
    return this.pokemonList().filter(p => 
      p.types.some(t => t.type.name === this.selectedType())
    );
  });

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon() {
    this.pokemonService.getPokemonList(100).subscribe(response => {
      response.results.forEach(pokemon => {
        this.pokemonService.getPokemonDetail(pokemon.name).subscribe(detail => {
          this.pokemonList.update(list => {
            const newList = [...list, detail];
            this.extractTypes(newList);
            return newList;
          });
        });
      });
      this.loading.set(false);
    });
  }

  extractTypes(pokemonList: PokemonDetail[]) {
    const types = new Set<string>();
    pokemonList.forEach(p => {
      p.types.forEach(t => types.add(t.type.name));
    });
    this.allTypes.set(['all', ...Array.from(types).sort()]);
  }

  catchPokemon(pokemon: PokemonDetail) {
    this.trainerService.catchPokemon(pokemon);
  }

  isCaught(pokemonId: number): boolean {
    return this.trainerService.isCaught(pokemonId);
  }

  goToProfile() {
    this.router.navigate(['/trainer']);
  }
}
