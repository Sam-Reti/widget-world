import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  imports: [],
  templateUrl: './calculator.html',
  styleUrl: './calculator.css',
})
export class Calculator {
  display = '';

  clear() {
    this.display = '';
  }

  del() {
    this.display = this.display.slice(0, -1);
  }

  append(value: string) {
    this.display += value;
  }

  calculate() {
    try {
      this.display = Function('return (' + this.display + ')')().toString();
    } catch {
      this.display = 'Error';
    }
  }
}
