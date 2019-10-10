import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlowPayerComponent } from './slow-payer.component';

describe('SlowPayerComponent', () => {
  let component: SlowPayerComponent;
  let fixture: ComponentFixture<SlowPayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlowPayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlowPayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
