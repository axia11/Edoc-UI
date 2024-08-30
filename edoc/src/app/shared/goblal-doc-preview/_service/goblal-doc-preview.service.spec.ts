import { TestBed } from '@angular/core/testing';

import { GoblalDocPreviewService } from './goblal-doc-preview.service';

describe('GoblalDocPreviewService', () => {
  let service: GoblalDocPreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoblalDocPreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
