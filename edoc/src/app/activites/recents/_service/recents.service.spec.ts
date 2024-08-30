import { TestBed } from '@angular/core/testing';

import { RecentsService } from './recents.service';

describe('RecentsService', () => {
  let service: RecentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
