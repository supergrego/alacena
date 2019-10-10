import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareAccountDialogComponent } from './share-account-dialog.component';

describe('ShareAccountDialogComponent', () => {
  let component: ShareAccountDialogComponent;
  let fixture: ComponentFixture<ShareAccountDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareAccountDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
