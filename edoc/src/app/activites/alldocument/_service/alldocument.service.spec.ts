import { TestBed } from '@angular/core/testing';

import { AlldocumentService } from './alldocument.service';

describe('AlldocumentService', () => {
  let service: AlldocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlldocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
