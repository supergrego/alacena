import { TestBed } from '@angular/core/testing';

import { DataSharingService } from './data-sharing.service';

describe('DataSharing.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataSharingService = TestBed.get(DataSharingService);
    expect(service).toBeTruthy();
  });
});
