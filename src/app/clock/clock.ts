import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-clock',
  standalone: true,
  templateUrl: './clock.html',
  styleUrl: './clock.css',
})
export class Clock implements OnInit {
  hrs = '00';
  min = '00';
  sec = '00';

  timerId: number | null = null;
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.updateTime();

    this.timerId = window.setInterval(() => {
      this.updateTime();
      this.cdr.detectChanges();
    }, 1000);
  }

  updateTime() {
    const now = new Date();

    let hours = now.getHours();
    hours = hours > 12 ? hours - 12 : hours;
    hours = hours === 0 ? 12 : hours;

    this.hrs = this.pad2(hours);
    this.min = this.pad2(now.getMinutes());
    this.sec = this.pad2(now.getSeconds());
  }

  pad2(num: number) {
    return num < 10 ? '0' + num : String(num);
  }
}
