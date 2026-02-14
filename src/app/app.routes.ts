import { Routes } from '@angular/router';
import { Calculator } from './calculator/calculator';
import { Clock } from './clock/clock';
import { HomeComponent } from './home/home';
import { Weather } from './weather/weather';
import { PokemonComponent } from './pokemon/pokemon';
import { IpComponent } from './ip/ip';
import { MetronomeComponent } from './metronome/metronome';
import { StopwatchComponent } from './stopwatch/stopwatch';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'calculator', component: Calculator },
  { path: 'clock', component: Clock },
  { path: 'weather', component: Weather },
  { path: 'pokemon', component: PokemonComponent },
  { path: 'date', component: Date },
  { path: 'ip', component: IpComponent },
  { path: 'metronome', component: MetronomeComponent },
  { path: 'stopwatch', component: StopwatchComponent },
];
