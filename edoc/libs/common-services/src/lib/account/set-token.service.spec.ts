import { TestBed } from '@angular/core/testing';

import { SetTokenService } from './set-token.service';

describe('SetTokenService', () => {
  let service: SetTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
