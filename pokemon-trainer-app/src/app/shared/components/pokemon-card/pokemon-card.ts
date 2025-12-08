import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PokemonDetail } from '../../../core/pokemonService';
import { CapitalizePipe } from '../../pipes/capitalize-pipe';

@Component({
  selector: 'app-pokemon-card',
  imports: [CapitalizePipe],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css',
})
export class PokemonCard {
  @Input() pokemon!: PokemonDetail;
  @Input() isCaught!: boolean;
  @Output() catch = new EventEmitter<PokemonDetail>();
}
