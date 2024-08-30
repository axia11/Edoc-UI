import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocCompanionComponent } from './doc-companion.component';

describe('DocCompanionComponent', () => {
  let component: DocCompanionComponent;
  let fixture: ComponentFixture<DocCompanionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocCompanionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocCompanionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
