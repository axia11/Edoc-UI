import { async, TestBed } from '@angular/core/testing';
import { LandingModule } from './landing.module';

describe('LandingModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LandingModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LandingModule).toBeDefined();
  });
});
