import { TestBed } from '@angular/core/testing';

import { MenuBarService } from './menu-bar.service';

describe('MenuBarService', () => {
  let service: MenuBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
