import { TestBed } from '@angular/core/testing';

import { PokemonListResponse, PokemonService, PokemonDetail } from './pokemonService';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PokemonService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  //test-case1 :
  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  //test-case2 : 
  it('should fetch pokemon list with correct limit',()=>{
    const mockRes: PokemonListResponse = {
      results: [
        {name: 'pikachu',url:'https://pokeapi.co/api/v2/pokemon/25/'},
        {name: 'charizard',url:'https://pokeapi.co/api/v2/pokemon/6/'}
      ]
    };

    service.getPokemonList(20).subscribe(res => {
      expect(res).toEqual(mockRes);
      expect(res.results).toHaveLength(2);
    });
    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=20');
    expect(req.request.method).toBe('GET');
    req.flush(mockRes);
  });

  //testcase3: get pokemon details with pokemon name
  it('should fetch pokemon detail by name', () => {
    const mockPokemon: PokemonDetail = {
      id: 25,
      name: 'pikachu',
      sprites: { front_default: 'https://example.com/pikachu.png' },
      types: [{ type: { name: 'electric' } }]
    };

    service.getPokemonDetail('pikachu').subscribe(pokemon=>{
      expect(pokemon).toEqual(mockPokemon);
      expect(pokemon.name).toBe('pikachu');
      expect(pokemon.id).toBe(25);
    });
    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/pikachu');
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);
  });

  afterEach(()=>{
    httpMock.verify();
  })
});
