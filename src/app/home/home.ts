import { Component } from '@angular/core';
import { Clock } from '../clock/clock'; // adjust path/name
import { Calculator } from '../calculator/calculator'; // adjust path/name
import { Weather } from '../weather/weather'; // adjust path/name
import { IpComponent } from '../ip/ip';
import { PokemonComponent } from '../pokemon/pokemon';
import { DateComponent } from '../date/date';
import { MetronomeComponent } from '../metronome/metronome';
import { StopwatchComponent } from '../stopwatch/stopwatch';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [
    Clock,
    Calculator,
    Weather,
    IpComponent,
    PokemonComponent,
    DateComponent,
    MetronomeComponent,
    StopwatchComponent,
  ],
})
export class HomeComponent {}
