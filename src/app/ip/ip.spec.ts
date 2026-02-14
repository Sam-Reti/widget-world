import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpComponent } from './ip';

describe('IpComponent', () => {
  let component: IpComponent;
  let fixture: ComponentFixture<IpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IpComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
