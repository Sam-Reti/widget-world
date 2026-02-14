import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  standalone: true,
  templateUrl: './stopwatch.html',
  styleUrl: './stopwatch.css',
})
export class StopwatchComponent implements OnDestroy {
  isRunning = false;

  private startTime = 0; // timestamp when started
  private elapsedMs = 0; // accumulated time when paused
  private intervalId: any;

  constructor(private cdr: ChangeDetectorRef) {}

  get display(): string {
    const total = this.elapsedMs;
    const minutes = Math.floor(total / 60000);
    const seconds = Math.floor((total % 60000) / 1000);
    const centis = Math.floor((total % 1000) / 10); // 00-99

    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');
    const cc = String(centis).padStart(2, '0');
    return `${mm}:${ss}.${cc}`;
  }

  start() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.startTime = Date.now() - this.elapsedMs;

    this.intervalId = setInterval(() => {
      this.elapsedMs = Date.now() - this.startTime;
      this.cdr.detectChanges();
    }, 10);
  }

  pause() {
    if (!this.isRunning) return;

    this.isRunning = false;
    clearInterval(this.intervalId);
  }

  reset() {
    this.pause();
    this.elapsedMs = 0;
  }

  toggle() {
    this.isRunning ? this.pause() : this.start();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
