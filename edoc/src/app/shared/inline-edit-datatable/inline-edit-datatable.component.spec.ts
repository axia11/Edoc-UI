import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineEditDatatableComponent } from './inline-edit-datatable.component';

describe('InlineEditDatatableComponent', () => {
  let component: InlineEditDatatableComponent;
  let fixture: ComponentFixture<InlineEditDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineEditDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineEditDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
