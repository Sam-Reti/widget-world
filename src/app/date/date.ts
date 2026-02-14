import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-date',
  imports: [DatePipe],
  templateUrl: './date.html',
  styleUrl: './date.css',
})
export class DateComponent {
  today = new Date();
}
