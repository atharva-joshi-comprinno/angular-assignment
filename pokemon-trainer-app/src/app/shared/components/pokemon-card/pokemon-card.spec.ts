import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCard } from './pokemon-card';

describe('PokemonCard', () => {
  let component: PokemonCard;
  let fixture: ComponentFixture<PokemonCard>;

  const mockPokemon = {
    id: 1,
    name: 'bulbasaur',
    sprites: { front_default: 'https://img.pokemondb.net/sprites/bulbasaur.png' },
    types: [{ type: { name: 'grass' } }],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PokemonCard]
    });
    fixture = TestBed.createComponent(PokemonCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pokemon', mockPokemon);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display pokemon name', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Bulbasaur');
  });

  it('should emit catch event when catch output is triggered', () => {
    let emittedPokemon: any;
    component.catch.subscribe((pokemon: any) => emittedPokemon = pokemon);
    
    component.catch.emit(mockPokemon);
    
    expect(emittedPokemon).toEqual(mockPokemon);
  });

  it('should show different button text based on caught status', () => {
    fixture.componentRef.setInput('isCaught', false);
    fixture.detectChanges();
    
    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent.trim()).toBe('Catch');
    
    fixture.componentRef.setInput('isCaught', true);
    fixture.detectChanges();
    expect(button.textContent.trim()).toBe('Catch');
  });
});
