import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderGroupedDialogComponent } from './order-grouped-dialog.component';

describe('OrderGroupedDialogComponent', () => {
  let component: OrderGroupedDialogComponent;
  let fixture: ComponentFixture<OrderGroupedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderGroupedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderGroupedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
