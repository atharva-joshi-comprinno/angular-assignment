import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCard } from './pokemon-card';

describe('PokemonCard', () => {
  let fixture: ComponentFixture<PokemonCard>;
  let component: PokemonCard;

  const mockPokemon = {
    id: 1,
    name: 'bulbasaur',
    sprites: { front_default: 'https://img.pokemondb.net/sprites/bulbasaur.png' },
    types: [{ type: { name: 'grass' } }],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PokemonCard] }).compileComponents();
    fixture = TestBed.createComponent(PokemonCard);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('pokemon', mockPokemon);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
