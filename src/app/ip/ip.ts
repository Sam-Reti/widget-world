import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ip',
  standalone: true,
  templateUrl: './ip.html',
  styleUrl: './ip.css',
})
export class IpComponent {
  ipAddress = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  getIP() {
    this.ipAddress = '';

    this.http.get<{ ip: string }>('https://api.ipify.org?format=json').subscribe({
      next: (response) => {
        this.ipAddress = response.ip;

        this.cdr.detectChanges();
      },
    });
  }
}
