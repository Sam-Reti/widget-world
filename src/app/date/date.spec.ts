import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateComponent } from './date';

describe('DateComponent', () => {
  let component: DateComponent;
  let fixture: ComponentFixture<DateComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
