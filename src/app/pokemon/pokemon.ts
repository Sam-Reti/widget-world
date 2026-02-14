import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

type PokeApiResponse = {
  name: string;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  moves: { move: { name: string } }[];
  sprites?: {
    front_default?: string | null;
    other?: {
      dream_world?: { front_default?: string | null };
    };
  };
};

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.css',
})
export class PokemonComponent implements OnInit {
  query = '';
  loading = false;
  error = '';

  data: PokeApiResponse | null = null;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  get imageUrl(): string {
    const s = this.data?.sprites;
    return s?.other?.dream_world?.front_default || s?.front_default || '';
  }

  get primaryType(): string {
    return this.data?.types?.[0]?.type?.name ?? '';
  }

  get abilityOne(): string {
    return this.data?.abilities?.[0]?.ability?.name ?? '-';
  }

  get move1(): string {
    return this.data?.moves?.[0]?.move?.name ?? '—';
  }

  get move2(): string {
    return this.data?.moves?.[1]?.move?.name ?? '—';
  }

  get move3(): string {
    return this.data?.moves?.[2]?.move?.name ?? '—';
  }

  reset() {
    this.data = null;
    this.error = '';
  }

  fetchPokemon() {
    const q = this.getNormalizedQuery();
    this.reset();

    if (!this.ensureQuery(q)) return;

    this.startLoading();
    this.requestPokemon(q);
  }

  private getNormalizedQuery(): string {
    return this.query.trim().toLowerCase();
  }

  private ensureQuery(q: string): boolean {
    if (q) return true;
    this.setError('Please enter a Pokémon name');
    return false;
  }

  private requestPokemon(q: string) {
    const url = this.buildPokemonUrl(q);

    this.http.get<PokeApiResponse>(url).subscribe({
      next: (res) => this.onSuccess(res),
      error: () => this.onError(),
    });
  }

  private buildPokemonUrl(q: string): string {
    return `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(q)}`;
  }

  private onSuccess(res: PokeApiResponse) {
    this.data = res;
    this.query = '';
    this.stopLoading();
  }

  private onError() {
    this.setError('Error: Pokémon Not Found');
    this.stopLoading();
  }

  private startLoading() {
    this.loading = true;
    this.detect();
  }

  private stopLoading() {
    this.loading = false;
    this.detect();
  }

  private setError(message: string) {
    this.error = message;
    this.detect();
  }

  private detect() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.loadDefaultPokemon();
  }

  private loadDefaultPokemon() {
    const defaultPokemon = 'pikachu'; // pick anything you like

    this.startLoading();
    this.requestPokemon(defaultPokemon);
  }
}
