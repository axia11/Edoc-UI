import { TestBed } from '@angular/core/testing';

import { DocTitleService } from './doc-title.service';

describe('DocTitleService', () => {
  let service: DocTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
