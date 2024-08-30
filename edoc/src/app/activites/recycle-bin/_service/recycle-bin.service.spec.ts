import { TestBed } from '@angular/core/testing';

import { RecycleBinService } from './recycle-bin.service';

describe('RecycleBinService', () => {
  let service: RecycleBinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecycleBinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
