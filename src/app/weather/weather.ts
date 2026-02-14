import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './weather.html',
  styleUrl: './weather.css',
})
export class Weather {
  private apiKey = '36f0b8b4daedbda7eb4429f0559338eb';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=imperial';

  search = '';
  weatherData: any = null;
  weatherIcon = '';
  error = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  checkWeather() {
    this.error = '';

    const parts = this.search.split(',');
    const city = parts[0]?.trim();
    const state = parts[1]?.trim()?.toUpperCase();

    if (!city || !state) {
      this.weatherData = null;
      this.weatherIcon = '';
      this.error = 'Use format: City, State (e.g., Denver, CO)';
      this.cdr.detectChanges();
      return;
    }

    const query = encodeURIComponent(`${city},${state},US`);
    const url = `${this.apiUrl}&q=${query}&appid=${this.apiKey}`;

    this.http.get(url).subscribe({
      next: (data: any) => {
        this.weatherData = data;

        const condition = data?.weather?.[0]?.main ?? '';
        this.setIcon(condition);

        this.cdr.detectChanges(); // important for zoneless apps
      },
      error: () => {
        this.weatherData = null;
        this.weatherIcon = '';
        this.error = 'City not found or API error.';
        this.cdr.detectChanges();
      },
    });
  }

  private setIcon(condition: string) {
    if (condition === 'Clouds') this.weatherIcon = 'assets/images/clouds.png';
    else if (condition === 'Clear') this.weatherIcon = 'assets/images/clear.png';
    else if (condition === 'Rain') this.weatherIcon = 'assets/images/rain.png';
    else if (condition === 'Drizzle') this.weatherIcon = 'assets/images/drizzle.png';
    else if (condition === 'Mist') this.weatherIcon = 'assets/images/mist.png';
    else if (condition === 'Snow') this.weatherIcon = 'assets/images/snow.png';
    else this.weatherIcon = '';
  }
}
