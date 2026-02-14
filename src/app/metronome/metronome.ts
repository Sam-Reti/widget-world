import { Component } from '@angular/core';

@Component({
  selector: 'app-metronome',
  imports: [],
  templateUrl: './metronome.html',
  styleUrl: './metronome.css',
})
export class MetronomeComponent {
  bpm = 100;
  isPlaying = false;

  private intervalId: any;
  private audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

  toggle() {
    this.isPlaying ? this.stop() : this.start();
  }

  start() {
    if (this.isPlaying) return;

    const intervalMs = 60000 / this.bpm;

    this.intervalId = setInterval(() => {
      this.click();
    }, intervalMs);

    this.isPlaying = true;
  }

  stop() {
    clearInterval(this.intervalId);
    this.isPlaying = false;
  }

  click() {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.frequency.value = 1000; // pitch of click
    gain.gain.value = 0.1;

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.03); // short click
  }

  updateTempo(delta: number) {
    this.bpm = Math.max(40, Math.min(240, this.bpm + delta));

    if (this.isPlaying) {
      this.stop();
      this.start(); // restart with new BPM
    }
  }
}
