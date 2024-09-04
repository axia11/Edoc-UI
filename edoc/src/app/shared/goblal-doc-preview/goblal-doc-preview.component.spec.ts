import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoblalDocPreviewComponent } from './goblal-doc-preview.component';

describe('GoblalDocPreviewComponent', () => {
  let component: GoblalDocPreviewComponent;
  let fixture: ComponentFixture<GoblalDocPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoblalDocPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoblalDocPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
