import { DOCUMENT } from '@angular/common';
import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ResizebleTableDirective } from './resizeble-table.directive';

describe('ResizebleTableDirective', () => {
  let directive: ResizebleTableDirective;
  let mockElementRef: ElementRef<HTMLElement>;
  let mockDocument: Document;

  beforeEach(() => {
    // Create mock objects
    mockElementRef = {
      nativeElement: document.createElement('div')
    } as ElementRef<HTMLElement>;

    mockDocument = document;

    // Configure the testing module
    TestBed.configureTestingModule({
      providers: [
        ResizebleTableDirective,
        { provide: DOCUMENT, useValue: mockDocument },
        { provide: ElementRef, useValue: mockElementRef }
      ]
    });

    // Inject the directive instance
    directive = TestBed.inject(ResizebleTableDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
