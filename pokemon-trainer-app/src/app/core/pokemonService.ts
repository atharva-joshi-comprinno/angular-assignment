import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PokemonListResponse {
  results: { name: string; url: string }[];
}

export interface PokemonDetail {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);
  private apiUrl = 'https://pokeapi.co/api/v2';

  getPokemonList(limit: number): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(`${this.apiUrl}/pokemon?limit=${limit}`);
  }

  getPokemonDetail(name: string): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(`${this.apiUrl}/pokemon/${name}`);
  }
}
