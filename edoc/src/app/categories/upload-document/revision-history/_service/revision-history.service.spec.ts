import { TestBed } from '@angular/core/testing';

import { RevisionHistoryService } from './revision-history.service';

describe('RevisionHistoryService', () => {
  let service: RevisionHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevisionHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
